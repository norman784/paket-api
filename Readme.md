# PAKET

Simplify the rest api server development. Not recommended yet for production at this stage, but play with it and feel free to fork / open an issue / make a suggestion.

It was inspired on [Action Hero](https://github.com/evantahler/actionHero), because it is an amazing project, but sometimes can do thing on my way, and also this is a pet project so at this point don't know what can expect about it.

## Features

- [Structured project](#structured-project)
- [Configuration](#configuration)
- [Controller based actions](#controller-based-actions)
- [API version support](#api-version-support)
- [Cluster support](#cluster-support)
- [API Documentation](#api-documentation)

## TODO

- Action parameters validation
- Middleware support:
  - Auth:
    - App id / key authentication
    - Password authentication
  - Databases:
    - Mongodb (co-monk based)
- Tasks
- Fault tolerance

### <a name="structured-project"></a>
## Project structure

|- actions
|   |- v1
|   |   |-controller.js
|   |- controller.js
|- middlewares
|   |- middleware.js
|- tasks
|   |- task.js
|- app.js
|- Readme.md

### <a name="configuration"></a>
## Configuration

- Clusters: Number of nodejs cluster that your app will fork
- Port: application port (if is a heroku app just leave it blank)
- Documentation: (Boolean) if you want to show the app documentation

### <a name="controller-based-actions"></a>
## Controller based actions

All the controllers must be on the actions folder. And have these structure

```javascript
// /actions/file.js
exports.index = {
  name : 'index', // method name, this will be represented on the url
  description : '', // what does the action
  input : { // the inputs that accepts the action, all are an array of objects with their validation if needed
    params : [], // params are the variables passed via url like and id (i.e. /path/:id => /path/1)
    body : [], // form post
    query : [], // query string
  },
  output : {}, // an example of what the method will return
  method : 'GET', // http verb (GET, POST, PUT, DELETE)
  action : function() {
    
  }
}
```

### <a name="api-version-support"></a>
## API version support

Supports folder versioning

i.e.

```
/file.js <-- controller file
/v1/file.js <-- v1 is a folder that may represent the version
/somedir/file.js <-- subfolders not necessarily must be a version, can be anything
```

Those examples will be interpreted as

```
/file/{actions}
/v1/file/{actions}
/somedir/file/{actions}
```

### <a name="cluster-support"></a>
## Cluster support

Uses the nodejs cluster

### <a name="api-documentation"></a>
## API documentation

Uses the action structure to generate a documentation that can be enabled to se under the url path /docs (by default is enabled in the configuration)

# License

  MIT