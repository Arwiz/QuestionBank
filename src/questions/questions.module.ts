import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DatabaseModule } from '../database/database.module';
import { questionsRepositoryroviders } from './questions.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionsRepositoryroviders],
})
export class QuestionsModule {}
