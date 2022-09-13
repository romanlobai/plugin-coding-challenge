import { IPluginSettings } from '@c8/interfaces';

export function PluginSetting(metadata: IPluginSettings) {
  return function (target: any, propertyKey: string) {
    let value: any;
    const getter = function() {
      const reflectMetadata = Reflect.getMetadata(propertyKey, target);
      return value;
    };

    const setter = function(newVal: string) {
      Reflect.defineMetadata(propertyKey, {
        name: metadata.name,
        displayName: metadata.displayName,
      }, target);

      value = newVal;
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    });
  };
}