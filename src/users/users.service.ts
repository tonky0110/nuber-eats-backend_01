import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users : Repository<User>
    ) {}

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
            await this.users.save(this.users.create({ email, password, role }));
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
            const user = await this.users.findOne({ email });

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
            return {
                ok: true,
                token: 'lalalalala'
            }

        } catch (error) {
            return {
                ok: false,
                error
            }
        }
    } 
}