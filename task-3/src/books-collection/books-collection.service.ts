import { HttpException, Injectable } from '@nestjs/common';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCollections } from './entities/books-collection.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksCollectionService {

  constructor(
    @InjectRepository(BookCollections)
    private readonly bookCollectionsRepository: Repository<BookCollections>,
    private readonly userServices: UsersService
  ){}

  
  // Creates a new book collection in the repository.
  async create(
    createBooksCollectionDto: CreateBooksCollectionDto,
    currentUserId: string
  ) {
    const newBook = { 
      ...createBooksCollectionDto, 
      userId: currentUserId  
    }
    const book = this.bookCollectionsRepository.create(newBook)
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
  async findFavorites(currentUserId: string){
    const favoriteBooks = await this.bookCollectionsRepository.find({
      where: { 
        favoriteOf: {
          id: currentUserId
        }
      },
    });

    return favoriteBooks
  }

  // make a book favorite  
  async changeFavorite(bookId: string, currentUserId: string){
    const book = await this.bookCollectionsRepository.findOneBy({ id: bookId });

    if (!book) {
        throw new HttpException("No book found with the given id", 404);
    }

    // get users favorite 
    const user = await this.userServices.findUserFavorite(currentUserId)
    const isFavorite = user.favoriteBooks?.some((favBook) => favBook.id === bookId);

    if (isFavorite) {
      // If it is already a favorite, remove it
      user.favoriteBooks = user.favoriteBooks.filter((favBook) => favBook.id !== bookId);
      await this.userServices.save(user);
      return `Book with ID ${bookId} has been removed from favorites.`;
    } else {
      // If it is not a favorite, add it
      user.favoriteBooks = [...(user.favoriteBooks || []), book];
      await this.userServices.save(user);
      return `Book with ID ${bookId} has been added to favorites.`;
    }
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

  // Updates a specific book by its ID if the author is the current user.
  async update(
    bookId: string, 
    updateBooksCollectionDto: UpdateBooksCollectionDto,
    currentUserId: string
  ) {
    const book = await this.bookCollectionsRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException("No book found with the given id", 404);
    }

    if ('book.userId' !== currentUserId) {
      throw new HttpException("You are not authorized to update this book", 403);
    }

    const result = await this.bookCollectionsRepository.update({ id: bookId }, updateBooksCollectionDto);

    if (result.affected == 0) {
      throw new HttpException("Failed to update the book", 400);
    }

    return await this.bookCollectionsRepository.findOne({ where: { id: bookId } });
  }

  // Delete a specific book by its ID if authorized.
  async remove(bookId: string, currentUserId: string) {
    const book = await this.bookCollectionsRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException("No book found with the given id", 404);
    }

    if ("book.userId" !== currentUserId) {
      throw new HttpException("You are not authorized to delete this book", 403);
    }

    const result = await this.bookCollectionsRepository.delete({ id: bookId });

    if (result.affected == 0) {
      throw new HttpException("Failed to delete the book", 400);
    }

    return { message: 'Book successfully removed', id: bookId };
  }
}
