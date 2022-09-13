import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PluginProxyModule } from './plugin-proxy/plugin-proxy.module';

@Module({
  imports: [PluginProxyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
