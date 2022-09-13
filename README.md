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

### P.S
If I missed something important during implementation, that you want to see, but it's not presented - let me know, I'm ready to improve it because some things were not totally clear for me (for example property decorator purpose).