import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
