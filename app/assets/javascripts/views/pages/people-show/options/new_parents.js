App.Views.PersonNewParents = Backbone.View.extend({
  template: JST["people/new_parents"],
  
  className: "add-parents floating-subview",

  events: {
    "submit form.new-parents-form": "addParents",
    "click a.close": "closeView"
  },

  render: function () {
    var renderedContent = this.template({
      person: this.model,
      tree: App.Models.currentTree
    })
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  closeView: function () {
    event.preventDefault();
    this.remove()
  },
  
  addParents: function (event) {
    console.log("Add parents submitted")
    event.preventDefault();    
    $(".add-parents").remove()
    
    var params = $(event.currentTarget).serializeJSON();
    var person = App.Models.currentTree.people().get(params["id"]);
    person.set(params["person"])
    
    person.save({}, {
      success: function () {
        $("#notice").show().html( "Parents added" ).fadeOut(3000)
        App.Models.currentTree.fetch();
      },
      error: function () {
        $("#notice").show().html( "Failed to update parents" ).fadeOut(3000)
      }
    })
  }
});