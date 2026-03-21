import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
 constructor(private readonly databaseService: DatabaseService){}

  async addComment(workoutId: number , commentData: Prisma.CommentCreateInput, userId: number) {
    return this.databaseService.comment.create({
      data:{ ...commentData,
              user: {
                connect: {id:userId}
              },
              workout:{
                connect:{id:workoutId}
              },
               updatedAt: new Date()
              
            }
    });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
