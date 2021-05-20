import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { v4 as uuidv4 } from 'uuid';
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "../entities/user.entity";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
    @Column()
    @Field(type => String)
    code: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @BeforeInsert()
    createCode(): void {
        // this.code = Math.random().toString(36).substring(2);
        this.code = uuidv4();
    }
}