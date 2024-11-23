import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';

@Controller('books-collection')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  @Post()
  create(@Body() createBooksCollectionDto: CreateBooksCollectionDto) {
    return this.booksCollectionService.create(createBooksCollectionDto);
  }

  @Get()
  findAll() {
    return this.booksCollectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksCollectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksCollectionDto: UpdateBooksCollectionDto) {
    return this.booksCollectionService.update(+id, updateBooksCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksCollectionService.remove(+id);
  }
}
