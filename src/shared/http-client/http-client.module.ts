import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { server } from '@config/server.config';

@Module({
  imports: [
    HttpModule.register({
      timeout: server.keepaliveTimeOut,
      maxRedirects: 5,
    }),
  ],
  providers: [],
  exports: [HttpModule],
})
export class HttpClientModule {}
