import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { UserRole } from 'src/enums/role.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
    ){}
    async create(user: any){
        const newUser =  this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string){
        return await this.userRepository.findOne({where: {email}});
    }

    async findOneById(id: string){
        return await this.userRepository.findOne({where: {id}});
    }

    async findUserFavorite(currentUserId: string){
        const user = await this.userRepository.findOne({
            where:{ id: currentUserId },
            relations:{
                favoriteBooks: true
            }
        });

        return user;
    };

    async promoteUser(userId: string) {
        const result = await this.userRepository.update({id: userId}, { role: UserRole.ADMIN });
        if (result.affected === 0) {
            throw new BadRequestException('No user found');
        }
        return await this.findOneById(userId);
    };
    
    async save(user: User){
        return await this.userRepository.save(user)
    }

    async count(){
        return await this.userRepository.count()
    }
}
