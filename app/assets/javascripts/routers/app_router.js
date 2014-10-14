App.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "treesIndex",
    "trees/new": "treesNew",
    "trees/:id(/people/:person_id(/))": "personShow",
    "trees/:id(*something)": "treesShow"
  },
  
  treesIndex: function () {
    var background = new App.Views.Background();

    App.Collections.trees.fetch();
    
    var indexView = new App.Views.TreesIndex({
      collection: App.Collections.trees
    });
    
    this.populateView({
      "body"  : background,
      "#full-content" : indexView
    });
    

  },
  
  treesNew: function () {
    var newView = new App.Views.TreesNew();
    $("#full-content").html(newView.render().$el)
  },
  
  // Expect hash with { el_to_replace_html: view}
  populateView: function (views_hash) {
    var keys = Object.keys(views_hash);
    var view;
    
    $('.is_displayed').toggleClass('is_displayed')
    
    this._currentViews = this._currentViews || []
    
    _.each(this._currentViews, function (view) {
      view.remove();
    });
    
    var appRouter = this;
    _.each(keys, function(key) {
      view = views_hash[key];
      if (key !== "body"){
        $(key).parent().addClass("is_displayed")
      }
      
      $(key).html(view.render().$el);
      
      appRouter._currentViews.push(view);
    });
  },
  
  treesShow: function (id) {
    console.log("TREE SHOW")
    
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    var pageInfo = new App.Views.PageInfo({
      model: tree
    });
    
    this.populateView({
      "body"          : background,
      "#left-content" : showView,
      "#page-info-container" : pageInfo
    });
    
  },
  
  personShow: function (id, person_id) {
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    var pageInfo = new App.Views.PageInfo({
      model: tree,
      pid: person_id
    });
    
    this.populateView({
      "body"          : background,
      "#left-content" : showView,
      "#page-info-container" : pageInfo
    });
    
    var showPersonView = new App.Views.PeopleShow({
      pid: person_id
    });
    
    this._removeCurrentViews

    this._currentViews = [background, showView, pageInfo];

    background.populateView({ "#right-content": showPersonView});
    showPersonView.makePretty();
  },
  
  _removeCurrentViews: function (){
    this._currentViews = this._currentViews || []
    _(this._currentViews).each( function(view){
      view.remove();
    })
  }
 });
