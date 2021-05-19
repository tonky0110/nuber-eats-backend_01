import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum, IsString } from "class-validator";

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
    @IsEmail() // for class-validator
    email: string;

    @Column() // for TypeORM
    @Field(type => String) // for graphql
    @IsString() // for class-validator
    password: string;


    @Column({ type: 'enum', enum: UserRole }) // for TypeORM
    @Field(type => UserRole) // for graphql
    @IsEnum(UserRole) // for class-validator
    role: UserRole;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        try{
            this.password = await bcrypt.hash(this.password, 10);
        }catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword: string) : Promise<boolean> {
        try {
            const ok =  await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}