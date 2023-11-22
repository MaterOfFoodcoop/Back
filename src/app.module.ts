import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

// ThrottlerModule.forRoot([
//   {
//     // 60초동안 10번 허용
//     ttl: 60000,
//     limit: 10,
//   },
// ]),

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
