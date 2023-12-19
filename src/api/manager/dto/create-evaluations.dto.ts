import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty({ description: 'Оценка', example: 5 })
  @IsNotEmpty({ message: 'Оценка не должна быть пустой' })
  @IsNumber({}, { message: 'Оценка должна быть числом' })
  score: number;

  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsNotEmpty({ message: 'ID пользователя не должен быть пустым' })
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  userId: number;
}
export class ErrorEvaluation {
  @ApiProperty({ description: 'Сообщение об ошибке' })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}