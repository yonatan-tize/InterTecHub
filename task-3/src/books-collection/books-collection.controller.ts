import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AllowedRoles } from 'src/decorator/role.decorator';
import { UserRole } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  // create a new book and return the newly created book
  @Post()
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  create(
    @Body() createBooksCollectionDto: CreateBooksCollectionDto,
    @CurrentUser() currentUserId: string
  ) {
    return this.booksCollectionService.create(createBooksCollectionDto, currentUserId);
  }

  // find all books
  @Get()
  @AllowedRoles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.booksCollectionService.findAll();
  }

  //get books whose favorite field is set to true
  @Get('favorite')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  findFavorites(@CurrentUser() currentUserId: string){
    return this.booksCollectionService.findFavorites(currentUserId)
  }

  // get books randomly
  @Get('random')
  @AllowedRoles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getRandomBooks(){
    return this.booksCollectionService.getRandomBooks()
  }

  // change the book with the given id to favorite
  @Put('favorite/:id')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  changeFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUserId: string
  ){
    return this.booksCollectionService.changeFavorite(id, currentUserId)
  }

  //get book by id
  @Get(':id')
  @AllowedRoles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.findOne(id);
  }

  // update book by id
  @Put(':id')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateBooksCollectionDto: UpdateBooksCollectionDto,
    @CurrentUser() currentUserId: string
  ) {
    return this.booksCollectionService.update(id, updateBooksCollectionDto, currentUserId);
  }

  //delete book by id
  @Delete(':id')
  @AllowedRoles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUserId: string
  ) {
    return this.booksCollectionService.remove(id, currentUserId);
  }
}
