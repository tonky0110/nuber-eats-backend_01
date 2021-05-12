import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async craeteAccount(@Args('input') createAccountInput : CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const { ok, error } = await this.userService.createAccount(createAccountInput);
            return {
                ok,
                error
            };
        }catch(error) {
            console.log(error);
            return {
                ok: false,
                error
            }
        }
    }
}