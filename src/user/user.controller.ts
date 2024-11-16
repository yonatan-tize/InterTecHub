import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  getName(){
    return this.userService.getName()
  }

  @Get('hobby')
  getHobby(){
    return this.userService.getHobby()
  }

  @Get('dream')
  getDream(){
    return this.userService.getDream()
  }

}
