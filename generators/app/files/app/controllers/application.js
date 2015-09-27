import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logout() {
      var controller = this;
      this.get('User').logout().then(function() {
        controller.transitionToRoute('');
      });
    }
  }
});
