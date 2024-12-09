import {Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, ManyToMany} from 'typeorm'
import { UserRole } from 'src/enums/role.enum'
import { BookCollections } from 'src/books-collection/entities/books-collection.entity'

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
  role: UserRole 


  @ManyToMany(() => BookCollections, (book) => book.favoriteOf)
  favoriteBooks: BookCollections[];

  @OneToMany(() => BookCollections, (bookCollection) => bookCollection.user)
  books?: BookCollections[];
}