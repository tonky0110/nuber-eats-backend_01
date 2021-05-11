import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString, Length, minLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType() // for Graphql
@Entity() // for TypeORM
export class Restaurant {
    @Field(type => Number) // for Graphql
    @PrimaryGeneratedColumn() // for typeORM
    @IsNumber() // for ValidationCheck
    id: number

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    @Length(5) // for ValidationCheck
    @IsString() // for ValidationCheck
    name: string;

    @Field(type => Boolean, { nullable: true }) // for Graphql
    @Column({ default: false }) // for typeORM
    @IsOptional() // for ValidationCheck
    @IsBoolean() // for ValidationCheck
    isVegan?: boolean;

    @Field(type => String, { defaultValue : '강남' }) // for Graphql defaultValue로하면 해당값을 자동으로 보냄, nullable로 하면 값을 보내지 않음.
    @Column() // for typeORM
    @IsString() // for ValidationCheck
    address: string;

    // @Field(type => String) // for Graphql
    // @Column() // for typeORM
    // @IsString() // for ValidationCheck
    // ownerName: string;

    // @Field(type => String) // for Graphql
    // @Column() // for typeORM
    // @IsString() // for ValidationCheck
    // categoryName: string;
}