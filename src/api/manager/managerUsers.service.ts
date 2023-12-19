/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // Метод для создания нового пользователя
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    // Создание нового экземпляра пользователя
    const newUser = this.usersRepository.create(createUserDto);

    try {
      // Сохранение пользователя в базе данных
      const savedUser = await this.usersRepository.save(newUser);
      return savedUser;
    } catch (error) {
      console.error(error);
      // Обработка ошибки сохранения
      throw new Error(
        'Database Error. There was a problem saving the user. Please try again later.',
      );
    }
  }

  // Метод для поиска пользователя по заданным критериям
  async findOne(findUser: FindUserDto): Promise<Users> {
    return this.usersRepository.findOne({
      where: findUser,
    });
  }
  // Метод для получения списка пользователей с пагинацией
  async findAllPage(page: number, perPage: number): Promise<Users[]> {
    try {
      const users = await this.usersRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occurred while fetching users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
