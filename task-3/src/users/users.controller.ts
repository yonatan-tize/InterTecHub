import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UserRole } from 'src/enums/role.enum';

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
        @CurrentUser() userId: string,
        @Res() res: any
    ){
        if (id !== userId){
          res.status(403).json({
              message: 'You can only update your own profile'
          });
          return;
        }
        return this.usersService.updateProfile(id, body);
    }
};
