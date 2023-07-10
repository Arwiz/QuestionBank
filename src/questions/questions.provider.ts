import { DataSource } from 'typeorm';
import { Question } from './entities/question.entity';
import { DATABASE_CONSTANTS } from 'src/database/database.provider.constant';

export const questionsRepositoryroviders = [
  {
    provide: DATABASE_CONSTANTS.QUESTION_REPOSITORY_PROVIDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
    inject: [DATABASE_CONSTANTS.DATA_SOURCE],
  },
];
