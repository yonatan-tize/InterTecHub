import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto'; 
import { UsersService } from 'src/users/users.service';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}
    async signUp(user: CreateUsersDto){  
        const foundUser = await this.usersService.findOneByEmail(user.email);
        if(foundUser){
            throw new HttpException('User already exists', 400);    
        };
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // Create a new user
        const newUser = await this.usersService.create(user);
        return newUser;
    }

    async signIn(user: SignInDto){
        //check if user exist
        const foundUser = await this.usersService.findOneByEmail(user.email);
        if(!foundUser){
            throw new HttpException('User not found', 404);
        };

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.password);
        if(!isPasswordCorrect){
            throw new HttpException('Invalid credentials', 401);
        }

        //generate token
        const payLoad = {
            email: foundUser.email, 
            sub: foundUser.id,
            role: foundUser.role
        }

        const jwt = await this.jwtService.signAsync(payLoad);

        //return token
    }

}
