import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


type UserRole = "client" | "owner" | "delivery";

@InputType({ isAbstract: true }) // for graphql
@ObjectType()  // for graphql
@Entity()  // for TypeORM
export class User extends CoreEntity {
    @Column() // for TypeORM
    @Field(type => String) // for graphql
    email: string;

    @Column() // for TypeORM
    @Field(type => String) // for graphql
    password: string;


    @Column() // for TypeORM
    @Field(type => String) // for graphql
    role: UserRole;
}