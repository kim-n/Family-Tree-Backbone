App.Views.PersonNewSpouse = Backbone.View.extend({
  template: JST["people/new_spouse"],
  
  className: "add-spouse floating-subview",
  
  events: {
    "submit form.new-spouse-form": "addSpouse",
    "click a.close": "closeView"
  },
  
  
  render: function () {
    var renderedContent = this.template({
      person: this.model
    })
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  closeView: function (event) {
    event.preventDefault();
    this.remove();
  },
  
  addSpouse: function (event) {
    console.log("Add spouse submitted")
    event.preventDefault();    
    $(".add-spouse").remove()

    var params = $(event.currentTarget).serializeJSON();
    
    if (params["spouseship"]["spouse_two_id"]) {
      var newSpouseShip = new App.Models.Spouseship(params["spouseship"])
      newSpouseShip.save({}, {
        success: function () {
          App.Models.currentTree.spouse_list().add(newSpouseShip);
          App.Models.currentTree.fetch();
       }
     });
      
    } else {
      
      var newPerson = new App.Models.Person(params["person"]);
      newPerson.save({}, {
        success: function () {
          App.Models.currentTree.people().add(newPerson);
          App.Models.currentTree.fetch();
       }
     });
   }
 }
});



