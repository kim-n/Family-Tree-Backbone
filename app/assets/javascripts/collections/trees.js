App.Collections.Trees = Backbone.Collection.extend({
  model: App.Models.Tree,
  
  url: "/api/trees",
  
  getOrFetch: function (id) {
    var trees = this;
    
    var tree;
    if ( tree = this.get(id) ) {
      tree.fetch();
    } else {
      tree = new App.Models.Tree({ id: id });
      tree.fetch({
        success: function () { trees.add(tree) }
      }) 
    }
    
    return tree;
  },
  
  initialize: function(){}
});

App.Collections.trees = new App.Collections.Trees();