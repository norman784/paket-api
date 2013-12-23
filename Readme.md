PAKET
=====

Simplify the rest api server development

Features
--------

- [Structured project](#structured-project)
- [Configuration](#configuration)
- [Controller based actions](#controller-based-actions)
- [API version support](#api-version-support)
- [Cluster support](#cluster-support)
- [API Documentation](#api-documentation)

TODO
----

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
Project structure
------------------

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
Configuration
--------------

- Clusters: Number of nodejs cluster that your app will fork
- Port: application port (if is a heroku app just leave it blank)
- Documentation: (Boolean) if you want to show the app documentation

### <a name="controller-based-actions"></a>
Controller based actions
------------------------

### <a name="api-version-support"></a>
API version support
--------------------

### <a name="cluster-support"></a>
Cluster support
---------------

### <a name="api-documentation"></a>
API documentation
-----------------