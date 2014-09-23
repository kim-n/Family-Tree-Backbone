App.Views.TreesShow = Backbone.View.extend({
  template: JST["trees/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },
  
  render: function () {
    var renderedContent = this.template({ 
      tree: this.model,
      people: _([])
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});