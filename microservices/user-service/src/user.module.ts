import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import configuration from './config/env';

@Module({
  imports: [ ConfigModule.forRoot({
    load: [configuration],
  }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('DATABASE_URL')
    }),
    inject: [ConfigService],
  }),
  SeedModule
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
