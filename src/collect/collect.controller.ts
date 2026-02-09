import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private readonly service: CollectService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async collectData(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() req,
  ) {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress;

    await this.service.sendEmail({
      ip,
      photo: file,
      latitude: body.lat,
      longitude: body.lng,
      deviceInfo: body.ua,
    });

    return { success: true };
  }
}
