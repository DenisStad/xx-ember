var App = require('./../../../../../app');
module.exports = {
  description: 'A model generator that generates models from xerxes',

   locals: function(options) {
     return { model: App.models[options.entity.name] };
  }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
