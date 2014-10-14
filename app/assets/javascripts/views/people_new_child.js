App.Views.PersonNewChild = Backbone.View.extend({
  template: JST["people/new_child"],
  
  className: "add-child floating-subview",
  
  initialize: function(options){
    this.parents_id = options.parents_id;
  },
  
  events: {
    "submit form.new-child-form": "submit",
    "click a.close": "close"
  },
  
  render: function () {
    var renderedContent = this.template({
      parents_id: this.parents_id,
      tree_id: App.Models.currentTree.id
    });
    
    this.$el.append(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newPerson = new App.Models.Person(params["person"]);
    
    $(".add-child").remove();
    
    newPerson.save({}, {
      success: function () {
        $("#notice").show().html( "Child added!" ).fadeOut(3000)
         
        App.Models.currentTree.people().add(newPerson);
        App.Models.currentTree.fetch();
      },
      error: function () {
        $("#notice").show().html( "Failed to add child" ).fadeOut(3000)
      }
    });
  },
  
  close: function (event) {
    event.preventDefault();
    this.remove();
  }
})