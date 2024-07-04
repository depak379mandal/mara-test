import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class AppQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty({ required: false, type: 'string', format: 'number' })
  @IsOptional()
  @Transform(({ value }) => (value ? +value : value))
  @IsNumber()
  count = 50;
}
