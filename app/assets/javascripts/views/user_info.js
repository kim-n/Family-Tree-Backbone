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
    $(".user-info-form").hide()
    event.preventDefault();
    var viewClass = $(event.currentTarget).attr("id") + "-view";
    console.log(viewClass)
    $("." + viewClass).show()
  },
  
  hideView: function (event) {
    event.preventDefault();
    var displayedView = $(event.currentTarget);
    displayedView.parent().hide();
  },
  
  userSignOut: function (event) {
    event.preventDefault();
    console.log("userSignOut clicked");
    $.removeCookie('session_token');
    App.Models.currentUser.clear();
  },
  
  userSignIn: function (event) {
    event.preventDefault();
    console.log("userSignIn clicked");
    
    var params = $(event.currentTarget).serializeJSON();
    
    var newUser = new App.Models.User({"id": 0});
    
    newUser.fetch({
      data: params,
      success: function (model, response) {
        App.Models.currentUser.set(model.attributes);
        $("#notice").show().html( model.escape("email") + " created" ).fadeOut(3000)
        $.cookie('session_token', model.attributes.session_token, { expires: 7 });
      },
      error: function () {
        $("#notice").show().html( "Failed to create user" ).fadeOut(3000)
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
      },
      error: function () {
        $("#notice").show().html( "Failed to create user" ).fadeOut(3000)
      }
    });
    
  }

});