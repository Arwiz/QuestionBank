import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DatabaseModule } from '../database/database.module';
import { questionsRepositoryroviders } from './questions.provider';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/multerCongig';

@Module({
  imports: [DatabaseModule, MulterModule.register(multerOptions)],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...questionsRepositoryroviders],
})
export class QuestionsModule {}
