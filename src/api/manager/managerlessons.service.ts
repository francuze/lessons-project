/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lessons } from 'src/entities/lessons.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from './dto/create-evaluations.dto';
import { Evaluations } from 'src/entities/evaluations.entity';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class ManagerLessonsService {
  constructor(
    @InjectRepository(Evaluations)
    private readonly evaluationsRepository: Repository<Evaluations>,
    @InjectRepository(Lessons) // Добавлен инжект репозитория для уроков
    private readonly lessonsRepository: Repository<Lessons>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async createLesson(CreateLessonDto: CreateLessonDto): Promise<Lessons> {
    // Создание нового экземпляра пользователя
    const newLesson = this.lessonsRepository.create(CreateLessonDto);

    try {
      // Сохранение пользователя в базе данных
      const savedLesson = await this.lessonsRepository.save(newLesson);
      return savedLesson;
    } catch (error) {
      console.error(error);
      // Обработка ошибки сохранения
      throw new Error(
        'Database Error. There was a problem saving the user. Please try again later.',
      );
    }
  }
  async findAllPage(page: number, perPage: number): Promise<Lessons[]> {
    try {
      const lessons = await this.lessonsRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
        relations: ['evaluations', 'evaluations.user'], // Включение связей с оценками и пользователями
      });
      return lessons;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occurred while fetching lessons.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createEvaluation(
    id: number,
    createEvaluationDto: CreateEvaluationDto,
  ): Promise<Evaluations | { error: string }> {
    try {
      const { score, userId } = createEvaluationDto;

      // Проверка наличия урока
      const lesson = await this.lessonsRepository.findOne({
        where: {
          id,
        },
      });
      if (!lesson) {
        throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
      }

      // Проверка наличия пользователя
      const user = await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const evaluation = this.evaluationsRepository.create({
        score,
        lesson,
        user,
        createdAt: new Date(),
      });

      const savedEvaluation = await this.evaluationsRepository.save(evaluation);
      return savedEvaluation;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Database Error. There was a problem saving the evaluation. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
