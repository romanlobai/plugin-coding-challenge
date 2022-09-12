import { HttpVerb, PluginType } from '@c8/enums';

export interface IExecutePluginRestExtensionMethod {
  httpVerb: HttpVerb;
  providerType: PluginType;
  pluginName: string;
  pluginMethod: string;
  settingId: string;
  queryParams: any;
  body: any;
}