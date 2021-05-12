import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users : Repository<User>
    ) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<string | undefined> {
        try{
            // Check new User.
            const exists = await this.users.findOne({ email });
            if (exists) {
                // make error.
                return 'There is a user with that email already.';
            }
            // create user & hash the password
            await this.users.save(this.users.create({ email, password, role }));
        }catch(e) {
            console.log(e);
            return "couldn't create account.";
        }
    }
}