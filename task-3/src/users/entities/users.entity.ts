import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm'

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    userName: string

    @Column()
    role: string 

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    deletedAt: Date
}