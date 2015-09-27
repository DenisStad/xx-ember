import Ember from 'ember';

export default Ember.Controller.extend({
  errors: {},

  isSignup: false,

  actions: {
    toggleSignup: function() {
      this.toggleProperty('isSignup');
    },
    signup: function() {
      var hasErrors = false;
      if (!this.get('model.email')) {
        this.set('model.errors.email', [ { message: 'Email is missing' } ]);
        hasErrors = true;
      }
      if (!this.get('model.password')) {
        this.set('model.errors.password', [ { message: 'Password is missing' } ]);
        hasErrors = true;
      }

      if (this.get('isSignup')) {
        if (!this.get('model.name')) {
          this.set('model.errors.name', [ { message: 'Name is missing' } ]);
          hasErrors = true;
        }
        if (!this.get('model.passwordConfirm')) {
          this.set('model.errors.passwordConfirm', [ { message: 'Password confirmation is missing' } ]);
          hasErrors = true;
        }
        if (this.get('model.password') && this.get('model.passwordConfirm') && this.get('model.password') !== this.get('model.passwordConfirm')) {
          this.set('model.errors.password', [ { message: 'Passwords don\'t match' } ]);
          hasErrors = true;
        }
        if (hasErrors) return;

        this.get('model').save().then(function(user) {
          this.set('User.loggedInUser', user);
          return user;
        });
      } else {
        if (hasErrors) return;
        var adapter = this.store.adapterFor('application');
        var host = adapter.host;
        var namespace = adapter.namespace;

        var controller = this;

        Ember.$.ajax({
          url: host + '/' + namespace + '/session/user',
          method: 'post',
          data: {
            email: this.get('model.email'),
            password: this.get('model.password')
          },
          error: function(error) {
            if (error.status === 401) {
              controller.set('loginError', 'Invalid combination of email and password');
            } else {
              controller.set('loginError', error);
            }
          }
        }).then(function(response) {
          var user = controller.store.createRecord('user', response.user);
          controller.set('User.loggedInUser', user);
          controller.transitionToRoute('album');
        });
      }

    }
  }

});
