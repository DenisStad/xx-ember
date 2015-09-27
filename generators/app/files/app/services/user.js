import Ember from 'ember';

export default Ember.Service.extend({
  //loggedInUser: null,
  store: Ember.inject.service('store'),
  checkLoginStatus: function() {
    var service = this;
    var store = this.get('store');
    var adapter = store.adapterFor('application');
    var host = adapter.host;
    var namespace = adapter.namespace;
    Ember.$.ajax({
      url: host + '/' + namespace + '/session/user',
      method: 'get',
      error: function(error) {
        if (error.status === 401) {
        }
      }
    }).then(function(response) {
      var user = store.createRecord('user', response.user);
      //application.inject('controller', 'user', 'service:user');
      //controller.get('userService').set('loggedInUser', user);
      service.set('loggedInUser', user);
    });
  }.on('init'),

  logout: function() {
    var service = this;
    var store = this.get('store');
    var adapter = store.adapterFor('application');
    var host = adapter.host;
    var namespace = adapter.namespace;
    return Ember.$.ajax({
      url: host + '/' + namespace + '/session/user',
      method: 'delete',
      error: function(error) {
        if (error.status === 401) {
        }
      }
    }).then(function(response) {
      service.get('loggedInUser').deleteRecord();
      return service.set('loggedInUser', null);
    });
  }
});
