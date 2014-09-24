App.Views.Background = Backbone.View.extend({
  template: JST["background"],
  
  events: {
    "click .show-person": "display"
  },
  
  render: function () {
    console.log(" Background loaded! ")
    var renderedContent = this.template({ 
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  display: function (event){
    event.preventDefault();
    var person_id = $(event.currentTarget).data("pid");

    var showPersonView = new App.Views.PeopleShow({
      id: person_id
    });

    $(".display-person").html(showPersonView.render().$el)

  }
});
