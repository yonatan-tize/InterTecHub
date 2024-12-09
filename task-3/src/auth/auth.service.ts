import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto'; 
import { UsersService } from 'src/users/users.service';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { JwtService } from '@nestjs/jwt';
import { AnyARecord } from 'dns';
import { UserRole } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}
    async signUp(user: CreateUsersDto){  
        //if email exist typeorm will return bad request since email is set unique 
        //hash password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // register new user if no user found the first user is admin
        const usersCount = await this.usersService.count();
        if (usersCount === 0){
            return await this.usersService.create({...user, role: UserRole.ADMIN})
        }

        return await this.usersService.create(user);
    }

    async signIn(user: SignInDto){
        //check if user exist
        const foundUser = await this.usersService.findOneByEmail(user.email);
        if(!foundUser){
            throw new HttpException('Wrong credentials', 401);
        };

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.password);
        if(!isPasswordCorrect){
            throw new HttpException('Wrong credentials', 401);
        }

        //generate token
        const payLoad = {
            email: foundUser.email, 
            sub: foundUser.id,
            role: foundUser.role
        };
        const jwt = await this.jwtService.signAsync(payLoad);

        //return token
        return { accessToken: jwt };
    };

    async validateUserByToken(token: string){
        try {
            console.log(token)
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.usersService.findOneByEmail(payload.email);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return user; // Return the user if valid
        } catch (err) {
            throw new UnauthorizedException('Invalid token when parsing token');
        }
    }
}
