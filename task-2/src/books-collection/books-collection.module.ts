import { Module } from '@nestjs/common';
import { BooksCollectionService } from './books-collection.service';
import { BooksCollectionController } from './books-collection.controller';

@Module({
  controllers: [BooksCollectionController],
  providers: [BooksCollectionService],
})
export class BooksCollectionModule {}
