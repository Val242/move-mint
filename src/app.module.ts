import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { DatabaseService } from './database/database.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    WorkoutsModule, 
    ExercisesModule, 
    CommentsModule, 
    DatabaseModule, 
    AuthModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 5000,
        limit: 1,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}

// provide: APP_GUARD:Popular way to apply rate limiting to your entire application
