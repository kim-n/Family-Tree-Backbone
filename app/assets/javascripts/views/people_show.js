// Assumes App.Model.currentTree is loaded as well as 
// App.Models.currentTree.people()

App.Views.PeopleShow = Backbone.View.extend({
  template: JST["people/show"],

  render: function () {
    console.log(" people show rendered ")
    
    allpeople = this.collection
    var renderedContent = this.template({ 
      id: this.id
    });
        
    this.$el.append(renderedContent);
    
    return this;
  }
});