var koa = require('koa')
  , cluster = require('cluster')
  , app = koa()
  , _ = require('underscore')
  , paket = require('./package.json')
  , config = {
    name : paket.name + ' v' + paket.version
    , port : process.env.PORT || 5000
    , clusters : 1
    , documentation : true
  }
  fork = function() {
    var worker = cluster.fork();
    worker.send({
      cmd: 'config',
      config : config,
      id : worker.id
    });
  };

exports.start = function(_config) {
  config = _.extend(config, _config || {});

  if (cluster.isMaster) {
    console.log('\x1B[32m[' + paket.name + '] v' + paket.version, '\x1B[39m');

    for (var i=0; i < config.clusters; ++i) {
      fork();
    }

    cluster.on('disconnect', function(worker){
      console.log('disconnect!');
      fork();
    });

    console.log('\x1B[32m[Paket] Listening on port\x1B[33m', config.port, '\x1B[39m');

  } else {
    process.on('message', function (msg){
      if (msg.cmd != 'config') return;

      log = console.log;
      console.log = function() {
        var args = [];
        Array.prototype.push.apply(args, arguments);
        args.unshift('\x1b[32m[Paket] cluster:\x1b[33m', msg.id, '\x1b[39m');
        log.apply(null, args);
      }

      app.on('error', require('./lib/error'));

      require('./lib/middleware')(app);
      require('./lib/action')(app);

      if (msg.config.documentation) {
        require('./lib/documentation').init(app);
      }

      app.listen(msg.config.port);
    });
  }
}