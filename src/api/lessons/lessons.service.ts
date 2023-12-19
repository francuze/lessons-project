/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ManagerLessonsService } from '../manager/managerlessons.service';

import { SearchLessonsDTO } from './dto/search-lesson.dto';
import { Lessons } from 'src/entities/lessons.entity';
import { CreateLessonDto } from '../manager/dto/create-lesson.dto';
import { CreateEvaluationDto } from '../manager/dto/create-evaluations.dto';
import { Evaluations } from 'src/entities/evaluations.entity';

@Injectable()
export class LessonsService {
  constructor(private readonly managerProject: ManagerLessonsService) {}

  async getLessons(project: SearchLessonsDTO): Promise<Lessons[]> {
    const { page, perPage } = project;
    return this.managerProject.findAllPage(page, perPage);
  }
  async createLessons(project: CreateLessonDto): Promise<Lessons> {
    return this.managerProject.createLesson(project)
  }
  async createEvaluation(id: number, createEvaluationDto: CreateEvaluationDto): Promise<Evaluations | { error: string }> {
    return this.managerProject.createEvaluation(id,createEvaluationDto)
  }
}
