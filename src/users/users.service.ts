import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';



@Injectable()
export class UsersService {


   constructor(private readonly databaseService: DatabaseService){}
  async create(createUserDto: Prisma.UserCreateInput ) {
    return this.databaseService.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return `This action returns all users in your app`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
