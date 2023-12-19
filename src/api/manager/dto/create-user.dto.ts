import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;

  @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
  @ApiProperty({
    description: 'Адрес электронной почты пользователя',
    example: 'john@example.com',
    required: false,
  })
  @IsOptional()
  email: string;
}
export class ErrorUser {
  @ApiProperty({ description: 'Сообщение об ошибке' })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}