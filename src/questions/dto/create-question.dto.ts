import { IsString, IsArray, IsEnum } from 'class-validator';
import { QuestionType } from 'src/constants';
export class CreateQuestionDto {
  @IsString()
  readonly text: string;

  @IsEnum(QuestionType)
  readonly type: QuestionType;

  @IsArray()
  readonly options: string[];

  @IsArray()
  readonly tags: string[];
}
