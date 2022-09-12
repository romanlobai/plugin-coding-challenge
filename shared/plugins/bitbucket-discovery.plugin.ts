import { Plugin, PluginRestExtension, PluginSetting } from '@c8/decorators';
import { HttpVerb, PluginScope, PluginType } from '@c8/enums';
import { IPlugin } from '@c8/interfaces';

@Plugin({
  name: 'BitbucketDiscovery',
  scope: PluginScope.PROVIDER,
  type: PluginType.MSG,
})
export class BitbucketDiscovery implements IPlugin {
  @PluginSetting({ name: 'access_token', displayName: 'Access Token' })
  accessToken: string;

  public async init(settingId: string): Promise<void> {
    console.log(`Initializing ${this.constructor.name} plugin`);
    await this.loadSettings(settingId);
  }

  private async loadSettings(settingId: string) {}

  public async routeRequest(request: any): Promise<any> {}

  public async resourceDiscovery(): Promise<any> {}

  @PluginRestExtension({ name: 'getRepositoriesWithMetadata', httpVerb: HttpVerb.POST })
  public async getRepositoriesWithMetadata(queryParams: any, body: any) {
    return 'Hello';
  }
}
