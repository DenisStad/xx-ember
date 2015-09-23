import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    offset: {
      refreshModel: true
    }
  },
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('meta', this.get('meta'));
  },
  model(params) {
    var that = this;
    return this.store.query('<%- "<\%= modelName %\>" %>', params).then(function(result) {
      that.set('meta', result.get('meta'));
      return result;
    });
  },
});
