## Installation

Dillinger requires [Node.js](https://nodejs.org/) v18+ to run.
Project based on [NestJS](https://nestjs.com/) v9 version

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run start:dev
```

## Explanation regarding implementation
Implemented
- class decorator Plugin
- method decorator PluginRestExtension
- property decorator PluginSetting
- "proxy" for PluginRestExtension call


For Plugin decorator, I used Reflect to store decorator metadata.

In PluginRestExtension I set metadata to function descriptor. Reflect can't be used there, because we can't get context of running function outside of this function to get metadata. For example we need it in proxy to checl avialability of the metod for external call.

In PluginSetting property decorator I set name and display name as args for decorator following code snippet in coding challenge. Honestly I didn't understand the idea of that properties, however I modified default setter to set additional properties in Reflect. Getter also can be modified depending on the purpose, I've just added Reflect.getMetadata row.

Proxy was implemented as common controller which has one handler for all types of requests.
If someone call path that includes ```/api/v1/_plugin``` then it will be redirected to this controller to make further check for plugin, method availability etc.

Load settings were hardcoded. According to my message response - it's ok
Bitbucket API integration with getting list of repositories and related metadata wasn't implemented as it's not the purpose of code challenge

## Testing
To execute plugin for listing repositories and their metadata on Bitbucket we need to:
Make request to
```http://localhost:3000/api/v1/_plugin/MESSAGE/BitbucketDiscovery/getParamsForFurtherOauth/dbaca097-6225-4d24-b354-5c45653ecb96```
This request will get hardcoded valuees for bitbucket which should be used by FE to complete Oauth process and get access token for Bitbucket HTTP API

Then we should make this steps to receive token:
 - Request: ```GET https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code```
 where client_id is a word received from plugin settings (You should use this hardcode value: aBJe7uujpmUHbZErdP)
 - After redirect - take the code from query params of the link. Send request
 ``` 
 curl -X POST -u "client_id:secret" https://bitbucket.org/site/oauth2/access_token -d grant_type=authorization_code -d code={code received on prev step}
 ```
 Where ```client_id: aBJe7uujpmUHbZErdP secret: hZHxtF7w9de82NPD9PkF943FXzAFVB8X``` (you will receive them on first step where you ask plugin for plugin settings)
 In response you should see access_token
 
 #### Use received token to ask plugin for repositories list with their metadata
 
 ```
 curl -X POST http://localhost:3000/api/v1/_plugin/MESSAGE/BitbucketDiscovery/getRepositoriesWithMetadata/dbaca097-6225-4d24-b354-5c45653ecb96 -H "Content-Type: application/json" -d '{"bitbucketAccessToken": "U-uSa1TTHlU5JSUa-HovqLwxnhAZqugaKj8GPATbdLctVXZJ8lCVCrPKks6o7UK2oyKOdolvsW-tQzNsBNkxZpRj7aZo5KI82sHTiox3-3YqJ30aLm2UgohbU6-p41g="}'
 ```
 Where bitbucketAccessToken is an access token from prev step

### P.S
If I missed something important during implementation, that you want to see, but it's not presented - let me know, I'm ready to improve it because some things were not totally clear for me (for example property decorator purpose).