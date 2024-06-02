import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateTodoListDto {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  public title: string;

  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  public userId: string;

  @IsDefined()
  @ApiProperty({ required: true })
  public TodoItems: Array<string>;
}
