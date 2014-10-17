App.Views.TreeIndex = Backbone.View.extend({
  template: JST["trees/index"],
  
  initialize: function () {
    this.listenTo(App.Models.currentUser.trees(), "sync add", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      trees: App.Models.currentUser.trees()
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});