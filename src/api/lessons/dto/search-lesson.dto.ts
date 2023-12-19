import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class SearchLessonsDTO {
  @ApiProperty()
  @IsNotEmpty()
  page: number

  @ApiProperty()
  @IsOptional()
  perPage: number
}

export class InternalServerErrorResponse {
  @ApiProperty({ description: 'Сообщение об ошибке' })
  message: string;

  constructor(message: string = 'INTERNAL_SERVER_ERROR') {
    this.message = message;
  }
}