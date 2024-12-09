import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { CreateBooksCollectionDto } from './dto/create-books-collection.dto';
import { UpdateBooksCollectionDto } from './dto/update-books-collection.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AllowedRoles } from 'src/decorator/role.decorator';
import { UserRole } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('books')
export class BooksCollectionController {
  constructor(private readonly booksCollectionService: BooksCollectionService) {}

  // create a new book and return the newly created book
  @Post()
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'users with role of user are allowed to create books' })
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
  @ApiOperation({ summary: 'Retrieve all books created by all users' })
  findAll() {
    return this.booksCollectionService.findAll();
  }

  //get favorite books 
  @Get('favorite')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Retrieve all favorite books of currently logged in user. only user is allowed' })
  findFavorites(@CurrentUser() currentUserId: string){
    return this.booksCollectionService.findFavorites(currentUserId)
  }

  // get books randomly
  @Get('random')
  @AllowedRoles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Retrieve random 1-10 books created by users' })
  getRandomBooks(){
    return this.booksCollectionService.getRandomBooks()
  }

  // save the book with the given id to favorite or remove it from favorite
  @Put('favorite/:id')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'to make a book favorite or remove from favorite' })
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
  @ApiOperation({ summary: 'Retrieve a single book with the given id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksCollectionService.findOne(id);
  }

  // update book by id
  @Put(':id')
  @AllowedRoles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'allows users to edit books created by them only' })
  update(
    @Param('id', ParseUUIDPipe) bookId: string, 
    @Body() updateBooksCollectionDto: UpdateBooksCollectionDto,
    @CurrentUser() currentUserId: string
  ) {
    return this.booksCollectionService.update(bookId, updateBooksCollectionDto, currentUserId);
  }

  //delete book by id
  @Delete(':id')
  @AllowedRoles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'delete a book with the given id' })
  remove(
    @Param('id', ParseUUIDPipe) bookId: string,
    @CurrentUser() currentUserId: string
  ) {
    return this.booksCollectionService.remove(bookId, currentUserId);
  }
}
