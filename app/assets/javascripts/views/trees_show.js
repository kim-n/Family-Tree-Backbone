App.Views.TreesShow = Backbone.View.extend({
  template: JST["trees/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.people(), "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      tree: this.model,
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});