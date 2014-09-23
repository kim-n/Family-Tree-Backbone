App.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "treesIndex",
    "trees/new": "treesNew",
    "trees/:id": "treesShow"
  },
  
  treesIndex: function () {
    App.Collections.trees.fetch();
    
    var indexView = new App.Views.TreesIndex({
      collection: App.Collections.trees
    });
    
    $('body').html(indexView.$el);
    
  },
  
  treesNew: function () {
    var newView = new App.Views.TreesNew();
    $("body").append(newView.render().$el)
  },
  
  treesShow: function (id) {
    var tree = App.Collections.trees.getOrFetch(id);
    tree.people().fetch();
    
    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    $("body").html(showView.render().$el);
  }
});