import { RestExtensionOptions } from '@c8/interfaces';

export function PluginRestExtension(metadata: RestExtensionOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.restExtensionMetadata = metadata;
  };
}