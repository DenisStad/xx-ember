var path = require('path');

exports = module.exports = function(App, mountRoute) {
  var router = App.router;
  var index = App.find('ember/dist');
  if (!index && App.environment.isProduction()) {
    throw new Error("ember/dist/ not found. Did you run ember build?");
  }

  App.router.use(App.express.static(index));
  App.router.get(mountRoute || /^(?!api)/, function(req, res, next) {
    res.sendFile(index + path.sep + 'index.html');
  });
};
