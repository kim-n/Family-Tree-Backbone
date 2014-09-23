window.App = {
  Collections: {},
  Models: {},
  Views: {},
  
  initialize: function () {
    
    App.Collections.trees.fetch()
    
    var view = new App.Views.TreesIndex({
      collection: App.Collections.trees
    });
    
    $('body').append(view.render().$el)
    
  }
};

$(App.initialize)

