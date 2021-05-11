import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType() // for Graphql
@Entity() // for TypeORM
export class Restaurant {
    @Field(type => Number) // for Graphql
    @PrimaryGeneratedColumn() // for typeORM
    @IsNumber()
    id: number

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    @IsString()
    name: string;

    @Field(type => Boolean) // for Graphql
    @Column() // for typeORM
    @IsBoolean()
    isVegan?: boolean;

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    @IsString()
    address: string;

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    @IsString()
    ownerName: string;

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    @IsString()
    categoryName: string;
}