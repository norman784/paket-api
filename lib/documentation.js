var route = require('koa-route');

GLOBAL._doc = GLOBAL._doc || {};

exports.init = function(app) {
  app.use(route.get('/docs', function *(){
    this.body = GLOBAL._doc;
  }));
}

exports.add = function(url, data) {
  var params = url.split('/')
    , doc = {
      name: data.name,
      description : data.description,
      input : data.input,
      output : data.output,
    };

  if (params[0] == '') params.shift();

  if (params.length == 1) {
    GLOBAL._doc[params[0]] = doc;
  } else if (params.length == 2) {
    // Init if necesary
    GLOBAL._doc[params[0]] = GLOBAL._doc[params[0]] || {};

    GLOBAL._doc[params[0]][params[1]] = doc;
  } else if (params.length == 3) {
    // Init if necesary
    GLOBAL._doc[params[0]] = GLOBAL._doc[params[0]] || {};
    GLOBAL._doc[params[0]][params[1]] = GLOBAL._doc[params[0]][params[1]] || {};

    GLOBAL._doc[params[0]][params[1]][params[2]] = doc;
  }
}