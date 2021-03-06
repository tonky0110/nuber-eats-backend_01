import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users : Repository<User>,
        @InjectRepository(Verification) private readonly verifications : Repository<Verification>,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
        try{
            const exists = await this.users.findOne({ email });
            if (exists) {
                return {
                    ok: false,
                    error: 'There is a user with that email already.'
                };
            }
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

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
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

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOne({ id });
            if (user) {
                return {
                    ok: true,
                    user
                };
            }
        } catch (error) {
            return { 
                ok: false,
                error: 'User Not Found.'
            };
        }
    }

    async editProfile(userId: number, { email, password }: EditProfileInput): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if (email) {
                user.email = email;
                user.verified = false;
                await this.verifications.save(this.verifications.create({ user }));
            }
            if (password) {
                user.password = password;
            }
            await this.users.save(user);
            return {
                ok: true
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Could not update profile.'
            };
        }
    }

 async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try {
            const verification = await this.verifications.findOne(
                { code },
                { relations: ['user'] },
            );
    
            if (verification) {
                verification.user.verified = true;
                this.verifications.delete(verification.id);
                this.users.save(verification.user);
                return {
                    ok: true
                };
            }
            throw new Error();
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                error
            };
        }
    }
}