import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Evaluations } from 'src/entities/evaluations.entity';
import { Lessons } from 'src/entities/lessons.entity';
import { ManagerLessonsService } from '../manager/managerlessons.service';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluations,Lessons,Users])],
  controllers: [LessonsController],
  providers: [LessonsService,ManagerLessonsService],
})
export class LessonsModule {}
