import { Controller, Get, Post, Body, Patch, Param, Delete,Request,UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

    @Post('/workouts/:id')
    create(
      @Param('id') workoutId: string,
      @Body() commentData: any,
      @Request() req: any
    ) {
      const userId = req.user.id;

      return this.commentsService.addComment(
        +workoutId,
        commentData,
        userId
      );
    }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() editCommentDto: Prisma.CommentUpdateInput, @Request() req) {
    const userId = req.user.id
    return this.commentsService.editComment(+id, editCommentDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() req:any) {
    const userId = req.user.id
    return this.commentsService.removeWorkout(+id, userId);
  }
}
