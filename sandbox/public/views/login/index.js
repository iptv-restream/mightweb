/**
 * SETUP
 **/
  var app = app || {};



/**
 * MODELS
 **/
  app.Login = Backbone.Model.extend({
    url: '/login',
    defaults: {
      errors: [],
      errfor: {},
      username: '',
      password: ''
    }
  });



/**
 * VIEWS
 **/
  app.LoginView = Backbone.View.extend({
    el: '#login',
    template: _.template( $('#tmpl-login').html() ),
    events: {
      'submit form': 'preventSubmit',
      'keypress [name="password"]': 'loginOnEnter',
      'click .btn-login': 'login'
    },
    initialize: function() {
      this.model = new app.Login();
      this.listenTo(this.model, 'sync', this.render);
      this.render();
    },
    render: function() {
      this.$el.html(this.template( this.model.attributes ));
      this.$el.find('[name="username"]').focus();
    },
    preventSubmit: function(event) {
      event.preventDefault();
    },
    loginOnEnter: function(event) {
      if (event.keyCode != 13) return;
      if ($(event.target).attr('name') != 'password') return;
      event.preventDefault();
      this.login();
    },
    login: function() {
      this.$el.find('.btn-login').attr('disabled', true);

      var me = this;

      this.model.save({
        username: this.$el.find('[name="username"]').val(),
        password: this.$el.find('[name="password"]').val()
      },{
        success: function(model, response, options) {
          if (response.success) {
            var returnUrl = app.loginView.$el.find('[name="returnUrl"]').val();
            if (returnUrl == '/') returnUrl = response.defaultReturnUrl;
            location.href = returnUrl;
          } else {
            me.$el.find('.btn-login').attr('disabled', false);
            model.set(response);
          }
        }
      });
    }
  });



/**
 * BOOTUP
 **/
  $(document).ready(function() {
    app.loginView = new app.LoginView();
  });


