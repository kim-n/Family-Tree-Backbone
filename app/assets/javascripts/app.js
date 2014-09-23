window.App = {
  Collections: {},
  Models: {},
  Views: {},
  
  initialize: function () {
    
    App.Collections.trees.fetch()
    
    console.log(App.Collections);
    
    var indexView = new App.Views.TreesIndex({
      collection: App.Collections.trees
    });
    
    $('body').append(indexView.$el);
    
    var newView = new App.Views.TreeNew();
    $("body").append(newView.render().$el)
    
  }
};

$(App.initialize)

