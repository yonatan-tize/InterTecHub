import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/decorator/role.decorator';
import { UserRole } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  // create a new book and return the newly created book
  @Post()
  @Role(UserRole.USER)
  @UseGuards(RolesGuard)
  create(@Body() createBooksCollectionDto: CreateBooksCollectionDto) {
    return this.booksCollectionService.create(createBooksCollectionDto);
  }

  // find all books
  @Get()
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.booksCollectionService.findAll();
  }

  //get books whose favorite field is set to true
  @Get('favorite')
  @Role(UserRole.USER)
  @UseGuards(RolesGuard)
  findFavorites(){
    return this.booksCollectionService.findFavorites()
  }

  // get books randomly
  @Get('random')
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getRandomBooks(){
    return this.booksCollectionService.getRandomBooks()
  }

  // change the book with the given id to favorite or not favorite
  @Put('favorite/:id')
  @Role(UserRole.USER)
  @UseGuards(RolesGuard)
  makeFavorite(@Param('id', ParseUUIDPipe) id: string){
    return this.booksCollectionService.changeFavorite(id)
  }

  //get book by id
  @Get(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.findOne(id);
  }

  // update book by id
  @Put(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBooksCollectionDto: UpdateBooksCollectionDto) {
    return this.booksCollectionService.update(id, updateBooksCollectionDto);
  }

  //delete book by id
  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.remove(id);
  }
}
