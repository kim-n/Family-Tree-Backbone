App.Views.PersonDeleteSelf = Backbone.View.extend({
  template: JST["people/delete_self"],
  
  className: "delete-self floating-subview",

  events: {
    "submit form.delete-self-form": "deleteSelf",
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
  
  deleteSelf: function (event) {
    console.log("Add parents submitted")
    event.preventDefault();    
    $(".delete-self").remove()
    
    var params = $(event.currentTarget).serializeJSON();
    console.log(params)
    var person = App.Models.currentTree.people().get(params["person"]["id"]);
    
    console.log("delete child?", params["delete_children"])
    person.destroy({
      data: { delete_children: params["delete_children"] },
      processData: true,
      success: function () {
        $("#notice").show().html( person.escape("name") + " deleted!" ).fadeOut(3000);
        App.Models.currentTree.fetch();
      },
      error: function () {
        $("#notice").show().html("Failed to delete " + person.escape("name") ).fadeOut(3000)
      }
    })
  }
});