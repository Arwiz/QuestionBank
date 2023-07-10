import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { DATABASE_CONSTANTS } from 'src/database/database.provider.constant';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(DATABASE_CONSTANTS.QUESTION_REPOSITORY_PROVIDER)
    private questionsRepository: Repository<Question>,
  ) {}

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    const question = this.questionsRepository.create(questionData);
    return this.questionsRepository.save(question);
  }

  async getQuestionById(id: any): Promise<Question> {
    return this.questionsRepository.findOne(id);
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  async updateQuestion(
    id: any,
    questionData: Partial<Question>,
  ): Promise<Question> {
    await this.questionsRepository.update(id, questionData);
    return this.questionsRepository.findOne(id);
  }

  async deleteQuestion(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
