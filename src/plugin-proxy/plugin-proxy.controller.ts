import { PluginType, HttpVerb } from '@c8/enums';
import { All, Body, Controller, Param, ParseEnumPipe, ParseUUIDPipe, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PluginProxyService } from './plugin-proxy.service';

@Controller('_plugin')
export class PluginProxyController {
  constructor(
    private pluginProxyService: PluginProxyService,
  ) {}

  @All(':providerType/:pluginName/:pluginMethod/:settingId')
  private async triggerRelatedPlugin(
    @Req() request: Request,
    @Param('providerType', new ParseEnumPipe(PluginType)) providerType: PluginType,
    @Param('pluginName') pluginName: string,
    @Param('pluginMethod') pluginMethod: string,
    @Param('settingId', ParseUUIDPipe) settingId: string,
    @Query() queryParams: any,
    @Body() body: any,
  ) {
    return this.pluginProxyService.executePluginRestExtensionMethod({
      httpVerb: request.method as HttpVerb,
      providerType,
      pluginName,
      pluginMethod,
      settingId,
      queryParams,
      body,
    });
  }
}