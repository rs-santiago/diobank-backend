import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user: string

    @Column({ nullable: false })
    name: string
    
    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    constructor(
        name: string,
        email: string,
        password: string,
    ){
        this.id_user = uuidv4()
        this.name = name
        this.email = email
        this.password = password
    }
}