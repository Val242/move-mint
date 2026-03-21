import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkoutsService {

  constructor(private readonly databaseService: DatabaseService){}
  createWorkout(createWorkoutDto: Prisma.WorkoutCreateInput, userId: number) {
    return this.databaseService.workout.create({
      data:{ ...createWorkoutDto,
        user: {
          connect: {id:userId}
        }}
    })
  }

    findAllWorkouts(
      userId: number,
      status?: 'PENDING' | 'ACTIVE' | 'COMPLETED'
    ) {
      return this.databaseService.workout.findMany({
        where: {
          userId,
          ...(status && { status }), // optional filter
        },
      });
    }

  async findOneWorkout(id: number) {
    return this.databaseService.workout.findUnique({
      where:{
        id
      }
    })
  }

  async updateWorkout(id: number, updateWorkoutDto: Prisma.WorkoutUpdateInput, userId:number) {
  const workout = await this.databaseService.workout.findUnique({
    where: { id: id }
  });

  if(!workout){
    throw new NotFoundException('Work out not found')
  }

  if(workout.userId !== userId){
    throw new ForbiddenException('You cannot update this workout')
  }
    return  this.databaseService.workout.update({
      where: {
        id
      },
      data: updateWorkoutDto
    })
  }

  async removeWorkout(id: number, userId:number) {
  const workout = await this.databaseService.workout.findUnique({
    where: { id: id }
  });

  if(!workout){
    throw new NotFoundException('Work out not found')
  }

  if(workout.userId !== userId){
    throw new ForbiddenException('You cannot delete this workout')
  }

    return this.databaseService.workout.delete({
      where:{
        id
      },
      
    })
  }
  // async addExercise(workoutId: number, exerciseData: Prisma.WorkoutExerciseCreateInput, userId: number) {
  //   const workout = await this.databaseService.workout.findUnique({
  //     where: { id: workoutId }
  //   });

  //   if(!workout){
  //     throw new NotFoundException('Work out not found')
  //   }

  //   if(workout.userId !== userId){
  //     throw new ForbiddenException('Invalid user.')
  //   } 
  //   return this.databaseService.workout.update({
  //     where: { id: workoutId },
  //     data: {
  //       exercises: {
  //         create: exerciseData
  //       }
  //     }
  //   });
  }

 


