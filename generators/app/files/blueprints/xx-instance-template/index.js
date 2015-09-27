var App = require('./../../../app');
module.exports = {
  description: 'A standard view for an instance of a model',
  locals: function(options) {
    return {
      model: App.models[options.entity.name],
      modelName: options.entity.name,
      capitalModelName: options.entity.name.substr(0, 1).toUpperCase() + options.entity.name.substr(1)
    };
  }

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
