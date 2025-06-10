import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo:Repository<User>){}
  async create(createUserDto: CreateUserDto) {

    const user = this.userRepo.create(createUserDto)

    return await this.userRepo.save(user)


  }

  async findAll() {
    return await this.userRepo.find()
  }  



  async findOne(id: number) {
  const user = await this.userRepo.findOne({ where: { id } });
  if (!user) {
    throw new BadRequestException('User not found');
  }
  return user;
}



 async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update({id} , updateUserDto)
  }

async remove(id: number) {
  return await this.userRepo.delete(id); 
}
}
