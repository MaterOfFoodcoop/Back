import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Answer } from 'src/qna/entities/answer.entity';
import { Question } from 'src/qna/entities/question.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        // host: configService.get<string>('DATABASE_HOST'),
        host: 'coop-backend-database.cjpevxxporen.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        // username: configService.get<string>('DATABASE_NAME'),
        // password: configService.get<string>('DATABASE_PASSWORD'),
        // database: configService.get<string>('DATABASE_DB'),
        username: 'admin',
        password: 'qlalfqjsgh1',
        database: 'coop',
        entities: [Product, Question, Answer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
