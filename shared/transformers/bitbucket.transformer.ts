import { IListRepositoriesTransformed, IListWorkspacesTransformed, IRepositoriesValuesTransformed, IWorkspacesValuesTransformed } from '@c8/interfaces';

export const listWorkspacesTransformer = (data: any): IListWorkspacesTransformed => {
  const {
    values,
    pagelen,
    size,
    page,
  } = data;

  const transformedValues = values.map(workspacesValuesTransformer);

  return {
    values: transformedValues,
    pagelen,
    size,
    page,
  }
}

const workspacesValuesTransformer = (data: any): IWorkspacesValuesTransformed => {
  const {
    type,
    uuid,
    name,
    slug,
    is_private: isPrivate,
    links,
    created_on: createdOn,
  } = data;

  return {
    type,
    uuid,
    name,
    slug,
    isPrivate,
    links,
    createdOn,
  }
}

export const listRepositoriesTransformer = (data: any): IListRepositoriesTransformed => {
  const {
    values,
    pagelen,
    size,
    page,
  } = data;

  const transformedValues = values.map(repositoriesValuesTransformer);

  return {
    values: transformedValues,
    pagelen,
    size,
    page,
  }
}

const repositoriesValuesTransformer = (data: any): IRepositoriesValuesTransformed => {
  const {
    type,
    uuid,
    full_name: fullName,
    links,
    name,
    slug,
    description,
    scm,
    website,
    owner: {
      display_name: displayName,
      links: ownerLinks,
      type: ownerType,
      uuid: ownerUuid,
      account_id: accountId,
      nickname,
    },
    workspace: {
      type: workspaceType,
      uuid: workspaceUuid,
      name: workspaceName,
      slug: workspaceSlug,
      is_private: workspaceIsPrivate,
      links: workspaceLinks,
      created_on: workspaceCreatedOn,
    },
    isPrivate,
    project: {
      type: projectType,
      key: projectKey,
      uuid: projectUuid,
      name: projectName,
      links: projectLinks,
    },
    forkPolicy,
    createdOn,
    updatedOn,
    size,
    language,
    hasIssues,
    hasWiki,
    mainbranch: {
      name: mainbranchName,
      type: mainbranchType,
    },
    override_settings: {
      default_merge_strategy: defaultMergeStrategy,
      branching_model: branchingModel,
    }
  } = data;

  return {
    type,
    uuid,
    fullName,
    links,
    name,
    slug,
    description,
    scm,
    website,
    owner: {
      displayName: displayName,
      links: ownerLinks,
      type: ownerType,
      uuid: ownerUuid,
      accountId: accountId,
      nickname,
    },
    workspace: {
      type: workspaceType,
      uuid: workspaceUuid,
      name: workspaceName,
      slug: workspaceSlug,
      isPrivate: workspaceIsPrivate,
      links: workspaceLinks,
      createdOn: workspaceCreatedOn,
    },
    isPrivate,
    project: {
      type: projectType,
      key: projectKey,
      uuid: projectUuid,
      name: projectName,
      links: projectLinks,
    },
    forkPolicy,
    createdOn,
    updatedOn,
    size,
    language,
    hasIssues,
    hasWiki,
    mainbranch: {
      name: mainbranchName,
      type: mainbranchType,
    },
    overrideSettings: {
      defaultMergeStrategy,
      branchingModel,
    }
  }
}