import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';

@Controller('books')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  @Post('create')
  create(@Body() createBooksCollectionDto: CreateBooksCollectionDto) {
    return this.booksCollectionService.create(createBooksCollectionDto);
  }

  @Get()
  findAll() {
    return this.booksCollectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksCollectionService.findOne(id);
  }

  @Get('favorite')
  findFavorites(){
    return this.booksCollectionService.findFavorites()
  }

  @Get('random')
  getRandomBooks(){
    return this.booksCollectionService.getRandomBooks(10)
  }

  @Put('favorite/:id')
  makeFavorite(@Param('id') id: string, @Body() updateDto: UpdateBooksCollectionDto){
    this.booksCollectionService.makeFavorite(id, updateDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksCollectionDto: UpdateBooksCollectionDto) {
    return this.booksCollectionService.update(id, updateBooksCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksCollectionService.remove(id);
  }
}
