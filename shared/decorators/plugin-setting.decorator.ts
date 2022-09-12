import { IPluginSettings } from '@c8/interfaces';

export function PluginSetting(metadata: IPluginSettings) {
  return function (target: any, propertyKey: string) {};
}