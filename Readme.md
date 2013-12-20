Simplify the rest api creation

Features
--------

- Configuration
- Project structure
- Controller based actions
- API version support
- Cluster support

TODO
----

- Fault tolerance
- API Documentation
- Action parameters validation
- Middleware support
- Tasks

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


Actions method params
---------------------

- api : object containing
  - params : url params i.e. /path/:param1/:param2
  - body : form body
  - query : query string
  - middleware : object containing the middlewares
- callback : receive two params, error and data