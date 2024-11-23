import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "book_collections"})
export class BookCollections {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    isbn: number

    @Column()
    publishedYear: number

    @Column({default: false})
    favorite: boolean

}
