import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksCollectionDto } from './create-books-collection.dto';

export class UpdateBooksCollectionDto extends PartialType(CreateBooksCollectionDto) {}
