import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './wallet.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/env';


@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }),
  MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('DATABASE_URL')
    }),
    inject: [ConfigService],
  })],
  controllers: [WalletController],
  providers: [WalletService],
})

export class WalletModule {}
