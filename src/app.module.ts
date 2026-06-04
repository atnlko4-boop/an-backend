import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { envValidationSchema } from './config/env.validation';

// New CMS Modules
import { AuthModule } from './modules/auth/auth.module';
import { PagesModule } from './modules/pages/pages.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { SeoModule } from './modules/seo/seo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    JwtModule.register({ global: true }), // For middleware decoding if necessary
    PrismaModule,
    // CMS Modules
    AuthModule,
    PagesModule,
    BlogsModule,
    EnquiriesModule,
    SubscribersModule,
    MediaModule,
    SettingsModule,
    DashboardModule,
    TestimonialsModule,
    SeoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
