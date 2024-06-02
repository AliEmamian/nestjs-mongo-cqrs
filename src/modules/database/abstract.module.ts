import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class DatabaseModule {
  static async registerAsync(uri: string): Promise<DynamicModule> {
    return MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async () => ({
        uri,
      }),
    });
  }
}
