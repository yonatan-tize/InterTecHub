import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    async signUp(@Body() user: CreateUsersDto){
        return await this.authService.signUp(user);
    }

    @Post('signin')
    async signIn(@Body() user: SignInDto){
        return await this.authService.signIn(user);
    }
}
