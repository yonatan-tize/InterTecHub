import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/users/dtos/create-users.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @ApiOperation({summary: 'allows new users to signup. he first user is by default admin'})
    @Post('signup')
    async signUp(@Body() user: CreateUsersDto){
        return await this.authService.signUp(user);
    }

    @ApiOperation({summary: 'allows users to signIn with the correct credentials'})
    @Post('signin')
    async signIn(@Body() user: SignInDto){
        return await this.authService.signIn(user);
    }
}
