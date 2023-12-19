/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { ManagerService } from './manager/managerUsers.service';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluations } from 'src/entities/evaluations.entity';
import { Lessons } from 'src/entities/lessons.entity';

@Module({
  imports: [LessonsModule, UserModule,TypeOrmModule.forFeature([Users,Evaluations,Lessons])],
  controllers: [],
  providers: [ManagerService],
})
export class ApiModule {}
