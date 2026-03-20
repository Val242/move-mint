import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() createWorkoutDto: Prisma.WorkoutCreateInput,@Request() req:any) {
    console.log(req.user)
    const userId = req.user.id
    return this.workoutsService.createWorkout(createWorkoutDto, userId);
  }

  @Get()
  findAll(@Query('status') status?: 'PENDING' | 'ACTIVE' | 'COMPLETED'  ) {
    return this.workoutsService.findAllWorkouts(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOneWorkout(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: Prisma.WorkoutUpdateInput, @Request() req) {
    const userId = req.user.id
    return this.workoutsService.updateWorkout(+id, updateWorkoutDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() req:any) {
    const userId = req.user.id
    return this.workoutsService.removeWorkout(+id, userId);
  }
}
