import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionType } from 'src/constants';

import { FileInterceptor } from '@nestjs/platform-express';
import { readFile, utils } from 'xlsx';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  @ApiBody({
    type: CreateQuestionDto,
    examples: {
      example1: {
        value: {
          text: 'What is the your Favorite Number?',
          type: QuestionType,
          options: ['One', 'Two', 'Three'],
          tags: ['Simple Questions'],
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: Question })
  async createQuestion(
    @Body() questionData: CreateQuestionDto,
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

  @Put(':_id')
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Updates a question by ID.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async updateQuestion(
    @Param('_id') _id: string,
    @Body() questionData: UpdateQuestionDto,
  ): Promise<Question> {
    console.log('updateQuestion', questionData, _id);
    return this.questionsService.updateQuestion(_id, questionData);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: number): Promise<void> {
    return this.questionsService.deleteQuestion(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadQuestions(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Question[] | any> {
    console.log('file.path', file);

    const workbook = readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const questionsData: any = utils.sheet_to_json(worksheet, {
      range: 1,
    });

    const createdQuestions: Question[] = [];

    for (const questionItem of questionsData) {
      const question = new Question();
      question.text = questionItem.text;
      question.type = questionItem.type;
      question.options = Array.isArray(questionItem.options)
        ? questionItem.options
        : [...questionItem.options.split(',')];
      question.tags = Array.isArray(questionItem.tags)
        ? questionItem.tags
        : [...questionItem.tags.split(',')];

      const createdQuestion = await this.questionsService.createQuestion(
        question,
      );
      createdQuestions.push(createdQuestion);
    }
    return createdQuestions;
  }
}
