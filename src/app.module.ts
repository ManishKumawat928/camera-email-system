import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectModule } from './collect/collect.module';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔥 KEY POINT
    }),
    CollectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
