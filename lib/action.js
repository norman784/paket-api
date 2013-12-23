var root = process.cwd() + '/actions'
  , _ = require('underscore')
  , path = require('require-dir')
  , route = require('koa-route')
  , documentation = require('./documentation')
  , isAction = function(obj) {
    var matched = 0;

    if (obj.hasOwnProperty('name')) ++matched;
    if (obj.hasOwnProperty('description')) ++matched;
    if (obj.hasOwnProperty('input')) ++matched;
    if (obj.hasOwnProperty('output')) ++matched;
    if (obj.hasOwnProperty('method')) ++matched;
    if (obj.hasOwnProperty('action')) ++matched;

    return matched >= 6;
  }
  , init = function(app, obj, path) {
    path = path || '';

    if (isAction(obj)) {
      var path = path.split('/')
        , action = obj.name
        , callback = function *(next) {
          // TODO validate inputs
          obj.action.apply(this, null);
        };

      path.pop();
      path = path.join('/');

      switch(action.toLowerCase()) {
        case 'index':
        case 'create':
          break;
        default:
          path += '/' + obj.name;
      }

      switch (obj.method.toUpperCase()) {
        case 'POST':
          app.use(route.post(path, callback));
          break;
        case 'DELETE':
          app.use(route.delete(path, callback));
          break;
        case 'PUT':
          app.use(route.put(path, callback));
          break;
        case 'GET':
          app.use(route.get(path, callback));
          break;
        default:
          throw new Error(obj.method.toUpperCase(), 'is not a supported http verb');
      }

      documentation.add(path, obj);
      console.log('\t[' + obj.method.toUpperCase() + ']', '\t', path);
    } else if (_.isObject(obj)) {
      for (var i in obj) init(app, obj[i], path + '/' + i);
    }
  }

module.exports = function(app) {
  var obj = path(root, { recurse : true });
  // console.log(obj);
  init(app, obj);
}