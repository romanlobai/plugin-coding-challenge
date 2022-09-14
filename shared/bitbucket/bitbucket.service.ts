import { IClientOptions, IListRepositoriesTransformed, IListWorkspacesTransformed } from '@c8/interfaces';
import { listRepositoriesTransformer, listWorkspacesTransformer } from '@c8/transformers';
import { APIClient, Bitbucket, Params } from 'bitbucket';

export class BitbucketService {
  private bitbucket: APIClient;
  constructor(options: IClientOptions) {
    const clientOptions = {
      baseUrl: 'https://api.bitbucket.org/2.0',
      request: { timeout: 1000 },
      auth: { token: options.accessToken },
    }

    this.bitbucket = new Bitbucket(clientOptions);
  }

  public async listWorkspaces(params: Params.WorkspacesGetWorkspaces): Promise<IListWorkspacesTransformed> {
    const { data } = await this.bitbucket.workspaces.getWorkspaces(params);
    return listWorkspacesTransformer(data);
  }

  public async listRepositories(params: Params.RepositoriesList): Promise<IListRepositoriesTransformed> {
    const { data } = await this.bitbucket.repositories.list(params);
    return listRepositoriesTransformer(data);
  }
}