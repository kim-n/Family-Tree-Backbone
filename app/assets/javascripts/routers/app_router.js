App.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "siteIndex",
    "trees/:id(/people/:person_id(/))": "personShow",
    "trees/:id(*something)": "treesShow"
  },
  
  siteIndex: function () {
    App.Models.currentUser = new App.Models.UserSession();
    if ($.cookie("session_token")) {
      App.Models.currentUser.set("id", $.cookie("session_token") );
      App.Models.currentUser.fetch()
    }
    
    var mainView = new App.Views.Home({});

    var background = new App.Views.Background();

    var userInfo = new App.Views.UserInfo({});
    
    this._populateView("full", {
      "body"  : background,
      "#full-content" : mainView,
      "#user-info-container" : userInfo      
    });
    
  },
  
  
  treesShow: function (id) {
    console.log("TREE SHOW")
    
    App.Models.currentUser = new App.Models.UserSession();
    if ($.cookie("session_token")) {
      App.Models.currentUser.set("id", $.cookie("session_token") );
      App.Models.currentUser.fetch();
    }
    
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    var pageInfo = new App.Views.PageInfo({
      model: tree
    });
    
    var userInfo = new App.Views.UserInfo({});
    
    this._populateView("split", {
      "body"          : background,
      "#left-content" : showView,
      "#page-info-container" : pageInfo,
      "#user-info-container" : userInfo      
    });
    
  },
  
  personShow: function (id, person_id) {
    console.log("PERSON SHOW")
    
    App.Models.currentUser = new App.Models.UserSession();
    if ($.cookie("session_token")) {
      App.Models.currentUser.set("id", $.cookie("session_token") );
      App.Models.currentUser.fetch();
    }
    
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();

    var showView = new App.Views.TreesShow({
      model: tree
    });
    
    var pageInfo = new App.Views.PageInfo({
      model: tree,
      pid: person_id
    });
        
    var userInfo = new App.Views.UserInfo({});
    
    this._populateView("split", {
      "body"          : background,
      "#left-content" : showView,
      "#page-info-container" : pageInfo,
      "#user-info-container" : userInfo      
    });
    
    var showPersonView = new App.Views.PeopleShow({
      pid: person_id
    });
    
    this._removeCurrentViews

    this._currentViews = [background, showView, pageInfo];

    background.populateView({ "#right-content": showPersonView});
    showPersonView.makePretty();
  },
  
  
  // Expect hash with { el_to_replace_html: view}
  _populateView: function ( page_type, views_hash) {
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
    
    $("#full-page").hide();
    $("#split-page").hide();
    if ( page_type === "full" ) { $("#full-page").show() }
    if ( page_type === "split" ) { $("#split-page").show() }    
  },
  
  _removeCurrentViews: function (){
    this._currentViews = this._currentViews || []
    _(this._currentViews).each( function(view){
      view.remove();
    })
  }
 });
