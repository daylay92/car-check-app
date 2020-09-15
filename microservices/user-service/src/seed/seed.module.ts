import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSeedService } from './seed.service';
import { User, UserSchema } from '../user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/env';

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
    })
  ],
    providers: [UserSeedService],
  })
export class SeedModule {}
