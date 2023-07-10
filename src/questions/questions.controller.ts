import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  async createQuestion(
    @Body() questionData: Partial<Question>,
  ): Promise<Question> {
    return this.questionsService.createQuestion(questionData);
  }

  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: number): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: number,
    @Body() questionData: Partial<Question>,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(id, questionData);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: number): Promise<void> {
    return this.questionsService.deleteQuestion(id);
  }
}
