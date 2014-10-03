App.Views.PersonShowOptions = Backbone.View.extend({
  template: JST["people/show_options"],
  
  events: {
    "click .new-parents-button": "addParents",
    "click .new-spouse-button": "addSpouse",
    "click .delete-person-button": "deleteSelf"
  },
  
  initialize: function(options){
    this.person_id = options.person_id
  },
  
  render: function () {
    var renderedContent = this.template({
      person_id: this.person_id
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  addParents: function (event) {
    console.log("create parents clicked")
    
    event.preventDefault();
    
    var person_id = $(event.currentTarget).attr("class").split(" ").pop();
    var person = App.Models.currentTree.people().get(person_id)
    
    
    $(".add-parents").remove()
    $(".button").remove()
    var newParentsView = new App.Views.PersonNewParents({
      className: "add-parents button",
      model: person
    })
    
    $('body').append(newParentsView.render().$el)

  },
  
  addSpouse: function (event) {
    console.log("create spouse clicked")
    
    event.preventDefault();
    
    var person_id = $(event.currentTarget).attr("class").split(" ").pop();
    var person = App.Models.currentTree.people().get(person_id)
    
    
    $(".add-spouse").remove()
    $(".button").remove()
    var newSpouseView = new App.Views.PersonNewSpouse({
      className: "add-spouse button",
      model: person
    })
    
    $('body').append(newSpouseView.render().$el)

  },
  
  deleteSelf: function (event) {
    console.log("delete self clicked")
    
    event.preventDefault();

    var person_id = $(event.currentTarget).attr("class").split(" ").pop();
    var person = App.Models.currentTree.people().get(person_id)
    
    
    $(".delete-self").remove()
    $(".button").remove()
        
    var deleteSelfView = new App.Views.PersonDeleteSelf({
      className: "delete-self button",
      model: person
    });
    
    $('body').append(deleteSelfView.render().$el)
  }
})