import { Injectable, NotFoundException } from '@nestjs/common';
import * as plugins from '@c8/plugins';
import { IExecutePluginRestExtensionMethod } from './plugin-proxy.interface';
import { PluginOptions, RestExtensionOptions } from '@c8/interfaces';

@Injectable()
export class PluginProxyService {
  public async executePluginRestExtensionMethod(data: IExecutePluginRestExtensionMethod) {
    const { httpVerb, providerType, pluginName, pluginMethod, settingId, queryParams, body } = data;

    const pluginClass = await this.getPluginClassByRelatedMetadata({ name: pluginName, type: providerType });
    const Plugin = new pluginClass();
    await Plugin.init(settingId);

    const pluginMethodsList = Object.getOwnPropertyNames(pluginClass.prototype);

    const foundPluginMethod = pluginMethodsList.find((method: string) => {
      const options: RestExtensionOptions = Plugin[method].restExtensionMetadata;

      const restExtensionSupported: boolean = Boolean(options);
      const requestedParamsCoincide: boolean = options?.name === pluginMethod && options?.httpVerb === httpVerb;

      return restExtensionSupported && requestedParamsCoincide;
    });

    if (!foundPluginMethod) {
      throw new NotFoundException('Plugin method which satisfy requested parameters is not found');
    }

    return Plugin[foundPluginMethod](queryParams, body);
  }

  private async getPluginClassByRelatedMetadata({ name, type }: Partial<PluginOptions>) {
    for (const property in plugins) {
      if (plugins.hasOwnProperty(property)) {
        const metadataName = Reflect.getMetadata('name', plugins[property]);
        const metadataType = Reflect.getMetadata('type', plugins[property]);

        const metadataSatisfyRequestedParams = metadataName === name && metadataType === type;
        if (metadataSatisfyRequestedParams) {
          return plugins[property];
        }
      }
    }
    throw new NotFoundException('Plugin which satisfy requested parameters is not found');
  }
}