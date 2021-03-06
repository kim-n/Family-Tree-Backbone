App.Views.UserInfo = Backbone.View.extend({
  template: JST["user_info"],
  
  tagName: "span",
  
  className: "user-info",

  events: {
    "click a#user-sign-out": "userSignOut",
    "click a#user-sign-in": "showView",
    "click a#user-create": "showView",
    "click a.hide-view": "hideView",    
    "submit form.create-new-user": "userCreate",
    "submit form.sign-in-user": "userSignIn"
  },
  
  initialize: function (options) {
    this.listenTo(App.Models.currentUser, "change", this.render);
  },

  render: function () {
    console.log("User info rendered")
    var renderedContent = this.template({
      user: App.Models.currentUser
    })
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  showView: function (event) {
    event.preventDefault();
    var viewClass = $(event.currentTarget).attr("id") + "-view";
    var viewForm = $("." + viewClass);
    
    if (viewForm.is(":visible") !== true) { $(".user-info-form").hide() }
    $("." + viewClass).toggle();
  },
  
  hideView: function (event) {
    event.preventDefault();
    var displayedView = $(event.currentTarget);
    console.log(displayedView.parent())
    
    displayedView.parent().toggle();
  },
  
  userSignOut: function (event) {
    event.preventDefault();
    
    App.Models.currentUser.destroy({
      success: function () {
        App.Models.currentUser.clear()
        $.removeCookie('session_token');
        
        // Refresh page so that session_token cookie in Rails is updated
        var oldURL = Backbone.history.fragment;
        Backbone.history.loadUrl(oldURL);
      },
      error: function () {
        $("#notice").show().html( "Failed to log out" ).fadeOut(3000)
      }
    })
  },
  
  userSignIn: function (event) {
    event.preventDefault();
    console.log("userSignIn clicked");
    
    var params = $(event.currentTarget).serializeJSON();
    
    var newSessionUser = new App.Models.UserSession(params);
    
    newSessionUser.save({},{
      success: function (model, response) {
        App.Models.currentUser.set(model.attributes);
        console.log("Success: User logged in! ")
        $.cookie('session_token', model.attributes.session_token, { expires: 7 });
        
        // Refresh page so that session_token cookie in Rails is updated
        var oldURL = Backbone.history.fragment;
        Backbone.history.loadUrl(oldURL);
      },
      error: function () {
        $("#notice").show().html( "Failed to sign in" ).fadeOut(3000)
      }
    });
  },
  
  userCreate: function (event) {
    event.preventDefault();
    console.log("submit add user");
    
    var params = $(event.currentTarget).serializeJSON();
    
    var newUser = new App.Models.User()
    
    newUser.save(params, {
      success: function (model, response) {
        App.Models.currentUser.set(model.attributes);
        $("#notice").show().html( model.escape("email") + " created" ).fadeOut(3000)
        $.cookie('session_token', model.attributes.session_token, { expires: 7 });

        var oldURL = Backbone.history.fragment;
        Backbone.history.loadUrl(oldURL);
      },
      error: function () {
        $("#notice").show().html( "Failed to create user" ).fadeOut(3000)
      }
    });
    
  }

});