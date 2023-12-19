/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ErrorUser } from '../manager/dto/create-user.dto';
import { Users } from 'src/entities/users.entity';
import { SearchUsersDTO } from './dto/search-users.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorResponse } from '../lessons/dto/search-lesson.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:page/:perPage')
  @ApiOperation({ summary: 'Список пользователей' })
  @ApiResponse({ status: 201, description: 'Успешный запрос', type: [Users] })
  @ApiResponse({ status: 500, description: 'Ошибка сервера', type: InternalServerErrorResponse })
  async findUsers(
    @Param() SearchUsersDTO: SearchUsersDTO,
    @Res() res
  ) {
    const users = await this.userService.FindUsers(SearchUsersDTO)
    return res.status(200).json(users);
  }
  @Post('/')
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBody({ type: CreateUserDto, description: 'Данные для создания пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан', type: Users })
  @ApiResponse({ status: 400, description: 'Некорректные данные', type: ErrorUser })
  @ApiResponse({ status: 500, description: 'Ошибка сервера', type: InternalServerErrorResponse })
  async createUser(
    @Body() User: CreateUserDto,
    @Res() res
  ) {
    const user =  await this.userService.createUser(User);
    return res.status(201).json(user);
  }
}
