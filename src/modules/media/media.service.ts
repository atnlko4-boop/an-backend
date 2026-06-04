import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadMedia(file: Express.Multer.File) {
    // 1. Upload to Cloudinary
    const result = await this.cloudinary.uploadFile(file);

    // 2. Save metadata to MongoDB
    const media = await this.prisma.media.create({
      data: {
        filename: file.originalname,
        originalName: file.originalname,
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
        altText: '',
      },
    });

    return media;
  }

  async findAll(page = 1, limit = 20, search = '') {
    const skip = (page - 1) * limit;
    const where = search
      ? { filename: { contains: search } }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('Media not found');
    return media;
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    
    // 1. Delete from Cloudinary
    await this.cloudinary.deleteFile(media.publicId);
    
    // 2. Delete from MongoDB
    await this.prisma.media.delete({ where: { id } });
    
    return { success: true, message: 'Media deleted successfully' };
  }
}
