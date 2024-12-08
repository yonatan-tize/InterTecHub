import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsInt, Min, Max, IsOptional, IsBoolean} from 'class-validator'
import { time } from 'console'

export class CreateBooksCollectionDto {

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    author: string

    @ApiProperty()
    @IsString()
    isbn: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    genre?: string

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    publishedYear: number
}
