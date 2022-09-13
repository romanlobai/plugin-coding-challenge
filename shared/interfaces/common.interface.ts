import { PluginScope, PluginType, HttpVerb } from '@c8/enums';

export interface IPlugin {
  init(settingId: string): Promise<void>;
  routeRequest(request: any): Promise<any>;
  resourceDiscovery(): Promise<any>;
}

export interface PluginOptions {
  /**
   * Plugin name.
   * If not specified then naming strategy will generate plugin name from entity name.
   */
  name?: string;
  /**
   * Plugin type.
   */
  scope?: PluginScope;
  /**
   * Plugin type.
   */
  type?: PluginType;
}

export interface SettingOptions {
  /**
   * Setting name.
   * If not specified then naming strategy will generate setting name from property name.
  */
  name?: string;
  /**
   * Setting display name for UI.
   * If not specified then naming strategy will generate setting name from property name.
  */
  displayName?: string;
  /**
   * Whether the setting is required or not.
   * If not specified then set to true.
  */
  isRequired?: boolean;
}

export interface RestExtensionOptions {
  /**
   * Rest extension name.
   * If not specified then naming strategy will generate setting name from method name.
  */
  name: string;
  /**
   * Rest extension verb.
  */
  httpVerb: HttpVerb;
}

export interface IPluginSettings {
  name: string,
  displayName: string,
}