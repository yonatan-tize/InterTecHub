import { Body, Controller, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UserRole } from 'src/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllowedRoles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Put('promote/:id')
    @AllowedRoles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    promoteUser(@Param('id') userId: string){
        return this.usersService.promoteUser(userId)
    }

};
