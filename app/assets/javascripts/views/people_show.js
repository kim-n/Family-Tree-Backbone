App.Views.PeopleShow = Backbone.View.extend({
  template: JST["people/show"],

  render: function () {
    console.log(" people show rendered ")
    
    allpeople = this.collection
    var renderedContent = this.template({ 
      people: this.collection,
      id: this.id
    });
        
    this.$el.append(renderedContent);
    
    return this;
  }
});