import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [MediaService, CloudinaryProvider, CloudinaryService],
  exports: [MediaService],
})
export class MediaModule {}
