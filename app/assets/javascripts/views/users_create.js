App.Views.User = Backbone.View.extend({
  template: JST["users/create"],
  
  events: {
    "click a.close": "closeView",
    "submit form.create-new-user": "addUser"
  },
  
  render: function () {
    console.log(" Background loaded! ")
    var renderedContent = this.template({ 
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  closeView: function (event) {
    event.preventDefault();
    this.remove();
  },
  
  addUser: function (event) {
    console.log("Add spouse submitted")
    event.preventDefault();    
    $(".add-spouse").remove()

    var params = $(event.currentTarget).serializeJSON();
  }
});


