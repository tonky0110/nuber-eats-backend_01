import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Number) // for graphql
    id: number;

    @CreateDateColumn()
    @Field(type => Date) // for graphql
    createdAt: Date;

    @UpdateDateColumn()
    @Field(type => Date) // for graphql
    updatedAt: Date;
}