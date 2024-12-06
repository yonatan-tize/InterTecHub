import {IsString, IsInt, Min, Max, IsOptional, IsBoolean} from 'class-validator'
import { time } from 'console'

export class CreateBooksCollectionDto {

    @IsString()
    title: string

    @IsString()
    author: string

    @IsString()
    isbn: string

    @IsString()
    @IsOptional()
    genre?: string

    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    publishedYear: number

    @IsBoolean()
    @IsOptional()
    favorite?: boolean
}
