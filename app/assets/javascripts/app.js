window.App = {
  Collections: {},
  Models: {},
  Routers: {},
  Views: {},
  
  initialize: function () {
    new App.Routers.AppRouter();
    Backbone.history.start();
  }
};

$(App.initialize)

