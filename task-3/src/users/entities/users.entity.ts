import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm'
import { UserRole } from 'src/enums/role.enum'

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column({})
    password: string

    @Column()
    userName: string

    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER
    })
    role: string 
}