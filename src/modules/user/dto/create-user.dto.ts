import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ required: true, example: 'text@test.com' })
  @IsDefined()
  @IsString()
  public username: string;

  @IsDefined()
  @ApiProperty({ required: true, example: 'mockPass' })
  @IsString()
  public password: string;
}
