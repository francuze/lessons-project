import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from '../manager/managerUsers.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService,ManagerService],
})
export class UserModule {}
