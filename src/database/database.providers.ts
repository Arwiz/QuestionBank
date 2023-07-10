import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: 'mongodb+srv://aarrvv33:8447175029@cluster0.3fcy1vc.mongodb.net/',
        useNewUrlParser: true,
        logging: true,
        database: 'AuditDB',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
