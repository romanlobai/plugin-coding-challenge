import { BitbucketService } from '@c8/bitbucket/bitbucket.service';
import { Plugin, PluginRestExtension, PluginSetting } from '@c8/decorators';
import { HttpVerb, PluginScope, PluginType } from '@c8/enums';
import { IPlugin } from '@c8/interfaces';

@Plugin({
  name: 'BitbucketDiscovery',
  scope: PluginScope.PROVIDER,
  type: PluginType.MSG,
})
export class BitbucketDiscovery implements IPlugin {
  @PluginSetting({ name: 'client_id', displayName: 'Client ID' })
  clientId: string;

  @PluginSetting({ name: 'oauth_consumer_key', displayName: 'Oauth consumer key' })
  oauthConsumerKey: string;

  @PluginSetting({ name: 'oauth_consumer_secret', displayName: 'Oauth consumer secret' })
  oauthConsumerSecret: string;

  public async init(settingId: string): Promise<void> {
    console.log(`Initializing ${this.constructor.name} plugin`);
    await this.loadSettings(settingId);
  }

  private async loadSettings(settingId: string) {
    // Hardcoded settings that should be taken from db
    this.clientId = 'aBJe7uujpmUHbZErdP';
    this.oauthConsumerKey = 'aBJe7uujpmUHbZErdP';
    this.oauthConsumerSecret = 'hZHxtF7w9de82NPD9PkF943FXzAFVB8X';
  }

  public async routeRequest(request: any): Promise<any> {}

  public async resourceDiscovery(): Promise<any> {}

  @PluginRestExtension({ name: 'getParamsForFurtherOauth', httpVerb: HttpVerb.GET })
  public async getParamsForFurtherOauth() {
    return {
      clientId: this.clientId,
      oauthConsumerKey: this.oauthConsumerKey,
      oauthConsumerSecret: this.oauthConsumerSecret,
    };
  }

  @PluginRestExtension({ name: 'getRepositoriesWithMetadata', httpVerb: HttpVerb.POST })
  public async getRepositoriesWithMetadata(queryParams: any, body: any) {
    const { bitbucketAccessToken } = body;

    const bitbucket = new BitbucketService({ accessToken: bitbucketAccessToken });

    const { values: workspaces} = await bitbucket.listWorkspaces({});

    const allWorkspacesRepositories = [];
    // Make via (for) instead of (map + Promise.all) to avoid spamming the API and achieving rate limit
    for (let i = 0; i < workspaces.length; i++) {
      const { slug } = workspaces[i];
      const { values: workspaceRepositories } = await bitbucket.listRepositories({ workspace: slug });
      allWorkspacesRepositories.push(...workspaceRepositories);
    }

    return allWorkspacesRepositories;
  }
}
