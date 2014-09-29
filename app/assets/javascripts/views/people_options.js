App.Views.PersonShowOptions = Backbone.View.extend({
  template: JST["people/show_options"],
  
  initialize: function(){
  },
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})