import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';

@Controller('books')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  // create a new book and return the newly created book
  @Post()
  create(@Body() createBooksCollectionDto: CreateBooksCollectionDto) {
    return this.booksCollectionService.create(createBooksCollectionDto);
  }

  // find all books
  @Get()
  findAll() {
    return this.booksCollectionService.findAll();
  }

  //get books whose favorite field is set to true
  @Get('favorite')
  findFavorites(){
    return this.booksCollectionService.findFavorites()
  }

  // get books randomly
  @Get('random')
  getRandomBooks(){
    return this.booksCollectionService.getRandomBooks()
  }

  // change the book with the given id to favorite or not favorite
  @Put('favorite/:id')
  makeFavorite(@Param('id', ParseUUIDPipe) id: string){
    return this.booksCollectionService.changeFavorite(id)
  }

  //get book by id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.findOne(id);
  }

  // update book by id
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBooksCollectionDto: UpdateBooksCollectionDto) {
    return this.booksCollectionService.update(id, updateBooksCollectionDto);
  }

  //delete book by id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.remove(id);
  }
}
