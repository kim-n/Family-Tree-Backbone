App.Views.DeletePeopleList = Backbone.View.extend({
  template: JST["people/delete_people"],
  
  className: "delete-list",
  
  events: {
    "submit form.delete-people" : "submit"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.people(), "sync", this.render);
  },
  
  render: function () {
    console.log(" Tree show rendered ")
    var renderedContent = this.template({ 
      tree: this.model,
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    console.log(" Delete List rendered ")
    
    $(".delete-list").hide();
    
    var params = $(event.currentTarget).serializeJSON();
    console.log(params)


    var view_tree = this.model;
    _.each(params["people_ids"], function (id) {
      var person = view_tree.people().get(id)

      person.destroy({
        success: function () {
          $("#notice").show().html( person.escape("name") + " deleted!" ).fadeOut(3000);
        },
        error: function () {
          $("#notice").show().html("Failed to delete " + person.escape("name") ).fadeOut(3000)
        }
      })
    })
    
    this.model.fetch();
    
    $("#left-content").children().show();
    
    $(".delete-list").remove();
  }
});
