import { HttpException, Injectable } from '@nestjs/common';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCollections } from './entities/books-collection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksCollectionService {

  constructor(
    @InjectRepository(BookCollections)
    private readonly bookCollectionsRepository: Repository<BookCollections>
  ){}

  async create(createBooksCollectionDto: CreateBooksCollectionDto) {
    const book = this.bookCollectionsRepository.create(createBooksCollectionDto)
    return await this.bookCollectionsRepository.save(book)
  }

  async findAll() {
    return await this.bookCollectionsRepository.find()
  }

  async findOne(id: string) {
    const book = await this.bookCollectionsRepository.findOne({
      where: {id}
    });
    if (!book){
      throw new HttpException("No book found with the given id", 400);
    };
    return book;
  }

  async findFavorites(){
    const favoriteBooks = await this.bookCollectionsRepository.find({
      where: { favorite: true }
    });

    return favoriteBooks
  }

  async makeFavorite(id: string, updateDto: UpdateBooksCollectionDto){
    const updatedBook = await this.bookCollectionsRepository.update(id, updateDto)

    if (updatedBook.affected == 0){
      throw new HttpException("No book found with the given id", 404);
    }

    return await this.bookCollectionsRepository.findOne({ where: { id } })
  }

  async update(id: string, updateBooksCollectionDto: UpdateBooksCollectionDto) {
    const result = await this.bookCollectionsRepository.update(id, updateBooksCollectionDto)

    if (result.affected == 0) {
      throw new HttpException("No book found with the given id", 404);
    };

    return await this.bookCollectionsRepository.findOne({ where: { id } })
  }

  async remove(id: string) {
    const result = await this.bookCollectionsRepository.delete(id)

    if (result.affected == 0){
      throw new HttpException("No book found with the given id", 404);
    }
    return { message: 'Book successfully removed', id };
  }
}
