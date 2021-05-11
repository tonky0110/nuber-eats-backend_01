import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // for Graphql
@Entity() // for TypeORM
export class Restaurant {
    @Field(type => Number) // for Graphql
    @PrimaryGeneratedColumn() // for typeORM
    id: number

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    name: string;

    @Field(type => Boolean) // for Graphql
    @Column() // for typeORM
    isVegan?: boolean;

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    address: string;

    @Field(type => String) // for Graphql
    @Column() // for typeORM
    ownerName: string;
}