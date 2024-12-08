import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dtos/update-users.dto';

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

    async findOneById(id: string){
        return await this.userRepository.findOne({where: {id}});
    }

    async updateProfile(id: string, updateUserDto: UpdateUsersDto){
        const user = this.findOneById(id)
        if (!user){
            throw new BadRequestException('User not foind')
        }
        return await this.userRepository.update(id, updateUserDto)
    }
}
