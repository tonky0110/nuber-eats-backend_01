import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // for Graphql
@Entity() // for TypeORM
export class Restaurant {
    @Field(type => Number) // for Graphql
    @PrimaryGeneratedColumn() // for typeORM
    id: number

    @Field(type => String) // for Graphql
    @Column() // form typeORM
    name: string;

    @Field(type => Boolean) // for Graphql
    @Column() // form typeORM
    isVegan?: boolean;

    @Field(type => String) // for Graphql
    @Column() // form typeORM
    address: string;

    @Field(type => String) // for Graphql
    @Column() // form typeORM
    ownerName: string;
}