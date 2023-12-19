import { ManagerService } from './api/manager/managerUsers.service';
import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import dotenv from 'dotenv';
import { Lessons } from './entities/lessons.entity';
import { Evaluations } from './entities/evaluations.entity';
dotenv.config();

@Module({
  imports: [ApiModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'lesson',
      entities: [Users,Lessons,Evaluations],
      synchronize: true,
    })]
})
export class AppModule {}
