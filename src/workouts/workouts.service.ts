import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkoutsService {

  constructor(private readonly databaseService: DatabaseService){}
  createWorkout(createWorkoutDto: Prisma.WorkoutCreateInput) {
    return this.databaseService.workout.create({
      data: createWorkoutDto
    })
  }

  findAllWorkouts(status?: 'PENDING' | 'ACTIVE' | 'COMPLETED' ) {
      if(status) return this.databaseService.workout.findMany({
        where: {
          status,
        }
      })
      return this.databaseService.workout.findMany()
  }

  findOneWorkout(id: number) {
    return this.databaseService.workout.findUnique({
      where:{
        id
      }
    })
  }

  updateWorkout(id: number, updateWorkoutDto: Prisma.WorkoutUpdateInput) {
    return this.databaseService.workout.update({
      where: {
        id
      },
      data: updateWorkoutDto
    })
  }

  removeWorkout(id: number) {
    return this.databaseService.workout.delete({
      where:{
        id
      }
    })
  }
}
