import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUsersDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    userName: string;
}