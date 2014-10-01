App.Views.PersonShowOptions = Backbone.View.extend({
  template: JST["people/show_options"],
  
  initialize: function(options){
    this.person_id = options.person_id
  },
  
  render: function () {
    var renderedContent = this.template({
      person_id: this.person_id
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})