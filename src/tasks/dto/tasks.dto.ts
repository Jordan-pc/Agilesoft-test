import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly state: boolean;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
