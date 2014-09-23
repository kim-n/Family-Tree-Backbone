App.Views.TreesShow = Backbone.View.extend({
  template: JST["trees/show"],
  
  render: function () {
    var renderedContent = this.template({ 
      tree: this.model,
      people: _([])
    });
    
    this.$el.html(reneredContent);
    
    return this;
  }
});