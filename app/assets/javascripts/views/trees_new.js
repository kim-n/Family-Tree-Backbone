App.Views.TreesNew = Backbone.View.extend({
  template: JST["trees/new"],
  
  className: "add-tree floating-subview",
  
  events: {
    "submit form.new-tree-form": "submit",
    "click a.close": "closeView"
  },
  
  render: function () {
    $(".floating-subview").remove()
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this; 
  },
  
  closeView: function (event) {
    event.preventDefault();
    this.remove();
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newTree = new App.Models.Tree(params["tree"]);
    
    console.log(App.Collections.trees)
    
    newTree.save({}, {
      success: function () { 
        $("#notice").show().html( "Tree added" ).fadeOut(3000)
        App.Collections.trees.add(newTree);
        Backbone.history.navigate("/", { trigger: true });
      },
      error: function () {
        $("#notice").show().html( "Failed to add tree" ).fadeOut(3000)
      }
    });
  }
});