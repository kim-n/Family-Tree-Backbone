App.Views.TreesNew = Backbone.View.extend({
  template: JST["trees/new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this; 
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newTree = new App.Models.Tree(params["tree"]);
    
    console.log(App.Collections.trees)
    
    newTree.save({}, {
      success: function () { 
        App.Collections.trees.add(newTree);
      Backbone.history.navigate("/", { trigger: true });
     }
    });
  }
});