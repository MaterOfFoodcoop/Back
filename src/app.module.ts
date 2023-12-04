import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { QnAModule } from './qna/qna.module';
import { AuthModule } from './auth/auth.module';

// ThrottlerModule.forRoot([
//   {
//     // 60초동안 10번 허용
//     ttl: 60000,
//     limit: 10,
//   },
// ]),

@Module({
  imports: [DatabaseModule, ProductsModule, QnAModule, AuthModule],
})
export class AppModule {}
