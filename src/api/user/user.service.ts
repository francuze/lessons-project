/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { ManagerService } from '../manager/managerUsers.service';
import { CreateUserDto } from '../manager/dto/create-user.dto';
import { SearchUsersDTO } from './dto/search-users.dto';

@Injectable()
export class UserService {
  constructor(private readonly managerProject: ManagerService) {}

  async createUser(User: CreateUserDto): Promise<Users | { error: string }> {
      return this.managerProject.createUser(User);
  }
  async FindUsers(
    SearchUsersDTO: SearchUsersDTO,
  ): Promise<Users[] | { error: string }> {
      try {
      const { page, perPage } = SearchUsersDTO;
      return this.managerProject.findAllPage(page, perPage);
      } catch (error) {
        console.log(error);
        throw new HttpException('An error occurred while fetching users.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
