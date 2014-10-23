App.Views.ChangeHead = Backbone.View.extend({
  template: JST["trees/change_head"],
  
  className: "change-head",
  
  events: {
    "submit form.change-head-form" : "submit"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.people(), "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      tree: this.model,
      head_id: this.model.get("head_id")
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    console.log(" Change Head Form rendered ")
    
    $(".change-head").hide();
    
    var params = $(event.currentTarget).serializeJSON();
    console.log(params)
    
    this.model.set(params["tree"])

    this.model.save({}, {
      success: function () {
        $("#notice").show().html( "Head changed!" ).fadeOut(3000);
      },
      error: function () {
        $("#notice").show().html( "Failed to change head" ).fadeOut(3000)
      }
    })
    
    $(".change-head").remove();
  }
});
