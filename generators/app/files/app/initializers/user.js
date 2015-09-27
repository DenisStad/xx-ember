import UserService from 'app/services/user'; 

export function initialize(container, application) {
  //application.deferReadiness();
  Ember.$.ajaxSetup({
    xhrFields: {
      withCredentials: true
    },
    dataType: 'json'
      /*
         headers: {
         'Authorization': 'Bearer ' + response.api_key.access_token
         }
         */
  });

  application.register('user:service', UserService, { singleton: true });
  
  /*
  container.lookup('store:main').find('user', 'current').then(function(user) {
    application.inject('route', 'currentUser', 'user:current');
    application.advanceReadiness();
  });
  */

  application.inject('controller', 'User', 'service:user');
}

export default {
  name: 'user',
  after: 'store',
  initialize: initialize,
};
