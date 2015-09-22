var path = require('path');

exports = module.exports = function(App, mountRoute) {
  var router = App.router;
  var index = App.find('ember/dist/index.html');
  if (!index && App.environment.isProduction()) {
    throw new Error("ember/dist/index.html not found. Did you run ember build?");
  }

  var distDir = index.split(path.sep);
  distDir.pop();
  distDir = distDir.join(path.sep);
  App.router.use(App.express.static(distDir));
  App.router.get(mountRoute || /^(?!api)/, function(req, res, next) {
    res.sendFile(__dirname + '/ember/dist/index.html');
  });
};
