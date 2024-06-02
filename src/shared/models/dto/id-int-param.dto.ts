import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IdIntParamDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 1,
    required: true,
  })
  id: number;
}

export class IdParamsDto {
  @ApiProperty({
    example: '[1, 2, 3]',
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  public ids: number[];
}
