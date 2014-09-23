App.Collections.TreePeople = Backbone.Collection.extend({
  url: function(){
    return this.tree.url() + "/people"
  },
  
  initialize: function(models, options){
    this.tree = options.tree;
  }
});