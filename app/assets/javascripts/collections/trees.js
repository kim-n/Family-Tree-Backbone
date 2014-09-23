App.Collections.Trees = Backbone.Collection.extend({
  model: App.Models.Tree,
  url: "/api/trees",
  initialize: function(){}
});

App.Collections.trees = new App.Collections.Trees();