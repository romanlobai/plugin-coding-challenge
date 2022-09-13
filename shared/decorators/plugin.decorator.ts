import { PluginOptions } from '@c8/interfaces';
import { Constructor } from '@c8/types';

export function Plugin(metadata: PluginOptions) {
  return function <T extends Constructor>(constructor: T) {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], constructor);
      }
    }
    return constructor;
  };
}