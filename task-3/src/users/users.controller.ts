import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Post("/:id")
    updateProfile(
        @Body() body: UpdateUsersDto, 
        @Param('id') id: string,
        @Req() req: any,
        @Res() res: any
    ){
        if (id !== req.user.id){
            return res.status(403).json({
                message: 'You can only update your own profile'
            });
        }
        return this.usersService.updateProfile(id, body);
    }
};
