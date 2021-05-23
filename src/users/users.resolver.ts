import { UseGuards } from "@nestjs/common";
import { Args, ArgsType, Context, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Mutation(returns => CreateAccountOutput)
    craeteAccount(@Args('input') createAccountInput : CreateAccountInput): Promise<CreateAccountOutput> {
        return this.userService.createAccount(createAccountInput);
    }

    @Mutation(returns => LoginOutput)
    login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput);
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser;
    }

    @Query(returns => UserProfileOutput)
    @UseGuards(AuthGuard)
    userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        return this.userService.findById(userProfileInput.userId);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOutput)
    editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        return this.userService.editProfile(authUser.id, editProfileInput);
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail(@Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
        return this.userService.verifyEmail(code);
    }
}