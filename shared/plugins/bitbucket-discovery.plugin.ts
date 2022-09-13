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

  private async loadSettings(settingId: string) {
    // Hardcoded settings
    this.accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NjMwNTIxOTksImV4cCI6MTc1Nzc0NjU5OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwiR2l2ZW5OYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCJ9.U2NYSCcWlqjnHDhWcXUDzIqKl-0podVvP3VT7DKT-RE';
  }

  public async routeRequest(request: any): Promise<any> {}

  public async resourceDiscovery(): Promise<any> {}

  @PluginRestExtension({ name: 'getRepositoriesWithMetadata', httpVerb: HttpVerb.POST })
  public async getRepositoriesWithMetadata(queryParams: any, body: any) {
    // Bitbucket API integration with getting list of repositories and related metadata should be implemented here
    // Didn't make this integration as it's not the purpose of code challenge
    return 'getRepositoriesWithMetadata method executed!';
  }
}
