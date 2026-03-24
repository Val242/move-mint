import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExercisesService {

  constructor(private readonly databaseService: DatabaseService){}
  
  async addExercise(createExercise: Prisma.ExerciseCreateInput , workoutId: number) {
      const workout =  await this.databaseService.workout.findUnique({
        where:{id: workoutId}
      })
      console.log(`workout found in service is ${workout?.id}`)
        if(!workout){
           throw new BadRequestException('workout id is required')
    }

    console.log(createExercise)
  
    return this.databaseService.exercise.create({
      data:{...createExercise,
          workouts:{
            connect:{
              id:workoutId
            }
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
