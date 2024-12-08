import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
    ){}
    async create(user: CreateUsersDto){
        const newUser =  this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string){
        return await this.userRepository.findOne({where: {email}});
    }
}
