App.Views.Background = Backbone.View.extend({
  template: JST["background"],
  
  events: {
    "click .show-person": "personDisplay",
    "click .show-tree": "treeDisplay"
  },
  
  render: function () {
    console.log(" Background loaded! ")
    var renderedContent = this.template({ 
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  // Duplicate function in AppRouter
  // Expect hash with { el_to_replace_html: view}
  populateView: function (views_hash) {
    var keys = Object.keys(views_hash);
    var view;
    
    this._currentViews = this._currentViews || []
    
    _.each(this._currentViews, function (view) {
      view.remove();
    });
    
    var mainView = this;
    _.each(keys, function(key) {
      view = views_hash[key];
      $(key).html(view.render().$el);
      
      mainView._currentViews.push(view);
    });
  },
  
  personDisplay: function (event){
    event.preventDefault();
    
    
    
    var person_id = $(event.currentTarget).data("pid");

    var showPersonView = new App.Views.PeopleShow({
      pid: person_id
    });
    
    var pageInfo = new App.Views.PageInfo({
      model: App.Models.currentTree,
      pid: person_id
    });
    
    this.populateView({ 
      "#right-content": showPersonView,
      "#page-info-container": pageInfo
    });
    showPersonView.makePretty();
    
    // Assumes #tree/:somenumber
    var oldURL = Backbone.history.fragment.split("/");
    var newURL = oldURL.shift() + "/" + oldURL.shift() + "/people/" + person_id;
    Backbone.history.navigate(newURL);
  },
  
  treeDisplay: function (event){
    event.preventDefault();
    
    var tree_id = $(event.currentTarget).data("tid");

    // Assumes #tree/:somenumber
    var oldURL = Backbone.history.fragment.split("/");
    var newURL = oldURL.shift() + "/" + oldURL.shift();
    Backbone.history.navigate(newURL);
  }
});


