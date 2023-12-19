import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class SearchUsersDTO {
  @ApiProperty()
  @IsNotEmpty()
  page: number

  @ApiProperty()
  @IsOptional()
  perPage: number
}
