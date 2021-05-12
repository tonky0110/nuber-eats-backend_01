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

    async createAccount({ email, password, role }: CreateAccountInput) {
        try{
            // Check new User.
            const exists = this.users.findOne({ email });
            if (exists) {
                // make error.
                return;
            }
            // create user & hash the password
            await this.users.save(this.users.create({ email, password, role }));
            return true;
        }catch(e) {
            console.log(e);
            return;
        }
    }
}