App.Collections.TreePeople = Backbone.Collection.extend({
  model: App.Models.Person,
  
  url: function(){
    return this.tree.url() + "/people"
  },
  
  initialize: function(models, options){
    this.tree = options.tree;
  }
});