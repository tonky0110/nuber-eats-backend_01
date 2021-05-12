import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";

enum UserRole {
    Client,
    Owner,
    Delivery
};

registerEnumType(UserRole, { name: 'UserRole' });

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


    @Column({ type: 'enum', enum: UserRole }) // for TypeORM
    @Field(type => UserRole) // for graphql
    role: UserRole;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try{
            this.password = await bcrypt.hash(this.password, 10);
        }catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}