import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExercisesService {

  constructor(private readonly databaseService: DatabaseService){}
  
  addExercise(createExercise: Prisma.ExerciseCreateInput , workoutId: number) {
    return this.databaseService.exercise.create({
      data:{...createExercise,
        workouts:{
          connect: {id:workoutId}
        }
      }
    })
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
