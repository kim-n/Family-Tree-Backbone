App.Views.TreesShow = Backbone.View.extend({
  template: JST["people/index"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.people(), "sync", this.render);
  },
  
  render: function () {
    console.log(" Tree show rendered ")
    var renderedContent = this.template({ 
      tree: this.model,
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});
