/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { InternalServerErrorResponse, SearchLessonsDTO } from './dto/search-lesson.dto';
import { Lessons } from 'src/entities/lessons.entity';
import { LessonsService } from './lessons.service';
import { CreateLessonDto, ErrorLesson } from '../manager/dto/create-lesson.dto';
import { CreateEvaluationDto, ErrorEvaluation } from '../manager/dto/create-evaluations.dto';
import { Evaluations } from 'src/entities/evaluations.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {}

    @Get('/:page/:perPage')
    @ApiOperation({ summary: 'Получить список уроков' })
    @ApiParam({ name: 'page', description: 'Номер страницы', example: '1' })
    @ApiParam({ name: 'perPage', description: 'Количество записей на странице', example: '10' })
    @ApiResponse({ status: 200, description: 'Успешный запрос', type: [Lessons] })
    @ApiResponse({ status: 500, description: 'Ошибка сервера', type: InternalServerErrorResponse })
    async findLessons(@Param() SearchLessonsDTO: SearchLessonsDTO, @Res() res) {
      const Lessons = await this.lessonsService.getLessons(SearchLessonsDTO)
      return res.status(200).json(Lessons);
    }
    @Post('/')
    @ApiOperation({ summary: 'Создать урок' })
    @ApiBody({ type: CreateLessonDto, description: 'Данные для создания урока' })
    @ApiResponse({ status: 201, description: 'Урок успешно создан', type: Lessons })
    @ApiResponse({ status: 400, description: 'Некорректные данные', type: ErrorLesson })
    @ApiResponse({ status: 500, description: 'Ошибка сервера', type: InternalServerErrorResponse })
    async createLesson(@Body() lesson: CreateLessonDto, @Res() res) {
        const Lesson = await this.lessonsService.createLessons(lesson)
        return res.status(201).json(Lesson);
    }
    @Post('/:id/evaluations')
    @ApiOperation({ summary: 'Выдать оценку ученику' })
    @ApiParam({ name: 'id', description: 'Идентификатор урока', example: '1' })
    @ApiBody({ type: CreateEvaluationDto, description: 'Данные для создания оценки' })
    @ApiResponse({ status: 201, description: 'Оценка успешно создана', type: ErrorEvaluation })
    @ApiResponse({ status: 400, description: 'Некорректные данные', type: ErrorEvaluation })
    @ApiResponse({ status: 500, description: 'Ошибка сервера', type: InternalServerErrorResponse })
    async createEvaluations(@Param('id') id: number, @Body() lesson: CreateEvaluationDto, @Res() res) {
      const Evaluation =  await this.lessonsService.createEvaluation(id,lesson)
      return res.status(201).json(Evaluation);
    }
}
