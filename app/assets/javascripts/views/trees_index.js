App.Views.TreesIndex = Backbone.View.extend({
  template: JST["trees/index"],
  events: {
    "click button.refresh": "refresh"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  refresh: function () {
    this.collection.fetch();
  },
  
  render: function () {
    var renderedContent = this.template({trees: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  }
});