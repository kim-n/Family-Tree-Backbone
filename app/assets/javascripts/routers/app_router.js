App.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "treesIndex",
    "trees/new": "treesNew",
    "trees/:id(/people/:person_id(/))": "personShow",
    "trees/:id(*something)": "treesShow"
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
  
  // Expect hash with { el_to_replace_html: view}
  populateView: function (views_hash) {
    var keys = Object.keys(views_hash);
    var view;
    
    this._currentViews = this._currentViews || []
    
    _.each(this._currentViews, function (view) {
      view.remove();
    });
    
    var appRouter = this;
    _.each(keys, function(key) {
      view = views_hash[key];
      $(key).html(view.render().$el);
      
      appRouter._currentViews.push(view);
    });
  },
  
  treesShow: function (id) {
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    this.populateView({
      "body"          : background,
      "#left-section" : showView
    });
    
  },
  
  personShow: function (id, person_id) {
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    this.populateView({
      "body"          : background,
      "#left-section" : showView
    });
    

    var showPersonView = new App.Views.PeopleShow({
      pid: person_id
    });

    background.populateView({ "#main": showPersonView});
    showPersonView.makePretty();
    
  }
});
