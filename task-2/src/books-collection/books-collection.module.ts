import { Module } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { BooksCollectionController } from './books-collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCollections } from './entities/books-collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCollections])],
  controllers: [BooksCollectionController],
  providers: [BooksCollectionService],
})
export class BooksCollectionModule {}
