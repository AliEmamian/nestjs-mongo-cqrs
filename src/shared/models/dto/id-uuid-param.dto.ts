import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdUUIDParamDto {
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({
    example: '6029abb9-ebeb-4b9b-aca1-58571529c158',
    required: true,
  })
  id: string;
}

export class UUIDParamsDto {
  @ApiProperty({
    example: '["6029abb9-ebeb-4b9b-aca1-58571529c158]"',
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  public ids: string[];
}
