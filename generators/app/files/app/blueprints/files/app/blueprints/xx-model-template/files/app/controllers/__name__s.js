import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['offset', 'limit'],
  offset: null,
  limit: 50,

  numPages: Ember.computed('limit', 'meta', function() {
    return Math.ceil(this.get('meta').count / this.get('limit'));
  }),

  actions: {
    showCreate() {
      var <%= "<\%= modelName %\>" %> = this.store.createRecord('<%= "<\%= modelName %\>" %>', {});
      this.set('<%= "<\%= modelName %\>" %>', <%= "<\%= modelName %\>" %>);
      this.get('create<%= "<\%= capitalModelName %\>" %>').show();
    },
    create() {
      this.get('<%= "<\%= modelName %\>" %>').save();
    },
    
    switchPage(offset) {
      this.set('offset', offset);
    }
  },
});
