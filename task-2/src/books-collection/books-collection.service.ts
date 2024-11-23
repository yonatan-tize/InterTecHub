import { Injectable } from '@nestjs/common';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';

@Injectable()
export class BooksCollectionService {

  create(createBooksCollectionDto: CreateBooksCollectionDto) {
    return 'This action adds a new booksCollection';
  }

  findAll() {
    return `This action returns all booksCollection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booksCollection`;
  }

  update(id: number, updateBooksCollectionDto: UpdateBooksCollectionDto) {
    return `This action updates a #${id} booksCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} booksCollection`;
  }
}
