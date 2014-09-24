App.Views.Background = Backbone.View.extend({
  template: JST["background"],
  
  render: function () {
    console.log(" Background loaded! ")
    var renderedContent = this.template({ 
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});
