import { User } from "src/users/entities/users.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "book_collections"})
export class BookCollections {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    title: string

    @Column()
    author: string

    @Column()
    isbn: string

    @Column({nullable: true})
    genre: string

    @Column()
    publishedYear: number

    @Column()
    userId: string

    @ManyToOne(()=> User, (user) => user.books, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToMany(()=> User, (user)=> user.favoriteBooks, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    favoriteOf?: User[]

}
