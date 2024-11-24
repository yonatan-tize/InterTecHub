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

  
  // Creates a new book collection in the repository.
  async create(createBooksCollectionDto: CreateBooksCollectionDto) {
    const book = this.bookCollectionsRepository.create(createBooksCollectionDto)
    return await this.bookCollectionsRepository.save(book)
  }

  // Retrieves all books from the database.
  async findAll() {
    return await this.bookCollectionsRepository.find()
  }

  // Retrieves a specific book by its ID.
  async findOne(id: string) {
    const book = await this.bookCollectionsRepository.findOne({
      where: {id}
    });
    if (!book){
      throw new HttpException("No book found with the given id", 404);
    };
    return book;
  }

  // Retrieves all favorite books from the database.
  async findFavorites(){
    const favoriteBooks = await this.bookCollectionsRepository.find({
      where: { favorite: true }
    });

    return favoriteBooks
  }

  // Updates a book's favorite status 
  async changeFavorite(id: string){
    const book = await this.bookCollectionsRepository.findOneBy({ id });

    if (!book) {
        throw new HttpException("No book found with the given id", 404);
    }

    const updatedFavoriteStatus = !book.favorite; 

    await this.bookCollectionsRepository.update(id, { favorite: updatedFavoriteStatus });

    return await this.bookCollectionsRepository.findOneBy({ id });
  }

  // Retrieves a random number (from 1 to 10) of books from the database.
  async getRandomBooks() {
    const limit = Math.floor(Math.random() * 10) + 1;
    return await this.bookCollectionsRepository
      .createQueryBuilder('book')
      .orderBy('RANDOM()') 
      .limit(limit)
      .getMany();
  }

  // Updates a specific book by its ID.
  async update(id: string, updateBooksCollectionDto: UpdateBooksCollectionDto) {
    const result = await this.bookCollectionsRepository.update(id, updateBooksCollectionDto)

    if (result.affected == 0) {
      throw new HttpException("No book found with the given id", 404);
    };

    return await this.bookCollectionsRepository.findOne({ where: { id } })
  }

  // Delete a specific book by its ID.
  async remove(id: string) {
    const result = await this.bookCollectionsRepository.delete(id)

    if (result.affected == 0){
      throw new HttpException("No book found with the given id", 404);
    }
    return { message: 'Book successfully removed', id };
  }
}
