export interface IClientOptions {
  accessToken: string;
}
interface IBitbucketLinks {
  [key: string]: string;
}
export interface IListWorkspacesTransformed {
  values: IWorkspacesValuesTransformed[];
  pagelen: number;
  size: number;
  page: number;
}

export interface IWorkspacesValuesTransformed {
  type: string;
  uuid: string;
  name: string;
  slug: string;
  isPrivate: boolean;
  links: IBitbucketLinks;
  createdOn: string;
}

export interface IListRepositoriesTransformed {
  values: IRepositoriesValuesTransformed[];
  pagelen: number;
  size: number;
  page: number;
}

export interface IRepositoriesValuesTransformed {
  type: string;
  uuid: string;
  fullName: string;
  links: IBitbucketLinks;
  name: string;
  slug: string;
  description: string;
  scm: string;
  website: string;
  owner: {
    displayName: string;
    links: IBitbucketLinks;
    type: string;
    uuid: string;
    accountId: string;
    nickname: string;
  }
  workspace: IWorkspacesValuesTransformed;
  isPrivate: boolean;
  project: {
    type: string;
    key: string;
    uuid: string;
    name: string;
    links: IBitbucketLinks;
  }
  forkPolicy: string;
  createdOn: string;
  updatedOn: string;
  size: number;
  language: string;
  hasIssues: boolean;
  hasWiki: boolean;
  mainbranch: {
    name: string;
    type: string;
  },
  overrideSettings: {
    defaultMergeStrategy: boolean;
    branchingModel: boolean;
  }
}