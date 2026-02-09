import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectModule } from './collect/collect.module';

@Module({
  imports: [CollectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
