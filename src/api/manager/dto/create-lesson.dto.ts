import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Название урока', example: 'Музыка' })
  @IsNotEmpty({ message: 'Название урока не должно быть пустым', each: true })
  @IsString({ message: 'Название урока должно быть строкой' })
  @Length(1, 100, { message: 'Название урока должно содержать от 1 до 100 символов' })
  name: string;

  @ApiProperty({ description: 'Код урока', example: 'music' })
  @IsNotEmpty({ message: 'Код урока не должен быть пустым', each: true })
  @IsString({ message: 'Код урока должен быть строкой' })
  @Length(1, 20, { message: 'Код урока должен содержать от 1 до 20 символов' })
  code: string;
}

export class ErrorLesson {
  @ApiProperty({ description: 'Сообщение об ошибке' })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
