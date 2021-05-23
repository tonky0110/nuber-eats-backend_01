import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { VerifyEmailInput } from "./dtos/verify-email.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users : Repository<User>,
        @InjectRepository(Verification) private readonly verifications : Repository<Verification>,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService
    ) {
        // jwtService.hello();
    }

    async createAccount({ email, password, role }: CreateAccountInput): Promise<{ok: boolean, error?: string}> {
        try{
            // Check new User.
            const exists = await this.users.findOne({ email });
            if (exists) {
                // make error.
                return {
                    ok: false,
                    error: 'There is a user with that email already.'
                };
            }
            // create user & hash the password
            const user = await this.users.save(this.users.create({ email, password, role }));
            await this.verifications.save(this.verifications.create({ user }))
            return {
                ok: true
            };
        }catch(e) {
            console.log(e);
            return {
                ok: false,
                error: "couldn't create account."
            };
        }
    }

    async login({ email, password }: LoginInput): Promise<{ ok: boolean, error?: string, token?: string }> {
        try {
            // 1. email 주소가 같은 사용자로 검색해서 찾기.
            const user = await this.users.findOne(
                { email },
                { select: ['id', 'password'] }
            );
            
            if (!user) {
                return {
                    ok: false,
                    error: 'User not found.'
                };
            }
            
            // 2. 해당하는 계정(account)의 비밀번호가 같은지 비교(hashing해야됨)
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: 'Wrong password'
                };
            }

            // 3. jwt 토큰생성.
            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token
            }

        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    }

    async findById(id: number): Promise<User> {
        return this.users.findOne({ id });
    }

    async editProfile(userId: number, { email, password }: EditProfileInput) {
        // return this.users.update(userId, { ...editProfileInput });
        const user = await this.users.findOne(userId);
        if (email) {
            user.email = email;
            user.verified = false;
            await this.verifications.save(this.verifications.create({ user }));
        }
        if (password) {
            user.password = password;
        }
        return this.users.save(user);
    }

    async verifyEmail(code: string): Promise<Boolean> {
        try {
            const verification = await this.verifications.findOne(
                { code },
                { relations: ['user'] },
            );
    
            if (verification) {
                verification.user.verified = true;
                console.log(verification.user);
                this.users.save(verification.user);
                return true;
            }
            throw new Error();
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}