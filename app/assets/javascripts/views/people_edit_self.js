App.Views.PersonEditSelf = Backbone.View.extend({
  template: JST["people/edit_self"],
  
  className: "edit-self floating-subview",
  
  events: {
    "submit form.edit-self-form": "editSelf",
  },
  
  
  render: function () {
    var renderedContent = this.template({
      person: this.model,
    })
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  
  editSelf: function (event) {
    console.log("Add parents submitted")
    event.preventDefault(); 
           
    var params = $(event.currentTarget).serializeJSON();
    var person = new App.Models.Person(params["person"]);

    var formData = new FormData();

    _.each(person.attributes, function(value, key){
      formData.append("person[" + key + "]", value);
    });

    formData.append('person[avatar]', $("#person-avatar")[0].files[0]);
    person.set("avatar", $("#person-avatar")[0].files[0]);
        
    $(".edit-self").html("Saving...")
    // Use backbone save rather than Backbone.sync or $.ajax inorder to utilize callbacks
    person.save({}, {
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        $(".edit-self").remove() 
        App.Models.currentTree.fetch();
      },
      error: function () {
        $(".edit-self").html("ERROR!") 
      }
    });

  }
});