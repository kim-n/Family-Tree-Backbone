App.Collections.SpouseList = Backbone.Collection.extend({
  model: App.Models.Spouseship,
  
  url: function(){
    return this.tree.url() + "/spouseships"
  },
  
  initialize: function(models, options){
    this.tree = options.tree;
  }
});