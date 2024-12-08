import { Body, Controller, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UserRole } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Put('promote/:id')
    promoteUser(@Param('id') userId: string){
        return this.usersService.promoteUser(userId)
    }

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
