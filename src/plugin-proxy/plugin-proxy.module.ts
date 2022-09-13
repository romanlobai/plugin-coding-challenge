import { Module } from '@nestjs/common';
import { PluginProxyController } from './plugin-proxy.controller';
import { PluginProxyService } from './plugin-proxy.service';

@Module({
  controllers: [PluginProxyController],
  providers: [PluginProxyService],
})
export class PluginProxyModule {}