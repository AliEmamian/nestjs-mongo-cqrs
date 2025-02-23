import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class UpdateTodoListDto {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  public title: string;
}
