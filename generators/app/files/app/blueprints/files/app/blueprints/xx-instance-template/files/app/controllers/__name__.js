import Ember from 'ember';

export default Ember.Controller.extend({
  isEditingDisabled: true,

  actions: {
    edit() {
      this.set('isEditingDisabled', false);
    },
    save() {
      var that = this;
      this.get('model').save().then(function(result) {
        that.set('isEditingDisabled', true);
        return result;
      });
    }
  }

});
