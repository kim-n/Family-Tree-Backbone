// Assumes App.Model.currentTree is loaded as well as 
// App.Models.currentTree.people()

App.Views.PeopleShow = Backbone.View.extend({
  template: JST["people/show"],

  render: function () {
    
    person = App.Models.currentTree.people().get(this.id)
    person.spouses()

    console.log(" people show rendered ")
    console.log( App.Models.currentTree)

    var renderedContent = this.template({ 
      person: person,
      spouse_list: person.spouses()
    });
        
    this.$el.append(renderedContent);
    
    return this;
  }
});