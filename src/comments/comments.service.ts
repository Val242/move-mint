import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async editComment(id: number , editCommentDto: Prisma.CommentUpdateInput, userId: number){
      const comment = await this.databaseService.comment.findUnique({
        where:{id: id}
      })
        if(!comment){
           throw new NotFoundException('Comment out not found')
    }
          if(comment.userId !== userId){
    throw new ForbiddenException('You cannot update this comment')
  }

    return this.databaseService.comment.update({
      where:{
        id
      },
      data: editCommentDto
    })

  }

   async removeWorkout(id: number, userId:number) {
  const comment = await this.databaseService.comment.findUnique({
    where: { id: id }
  });

  if(!comment){
    throw new NotFoundException('Comment out not found')
  }

  if(comment.userId !== userId){
    throw new ForbiddenException('You are not authorized to delete this comment')
  }

    return this.databaseService.comment.delete({
      where:{
        id
      },
      
    })
  }
}
