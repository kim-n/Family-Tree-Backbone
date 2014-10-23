App.Views.TreeCommands = Backbone.View.extend({
  template: JST["tree_commands"],
  
  tagName: "span",
  
  className: "tree-commands",
  
  events: {
    "click a.add-person-link" : "toggleNewPersonForm",
    "submit form.new-person-form": "createNewPerson",
    "click a.delete-people-link" : "deletePeople",
    "click a.change-head-link" : "changeHead"
  },
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(App.Models.currentUser, "sync", this.render);
  },

  render: function () {
    var renderedContent = ""
    
    if ((App.Models.currentUser.id !== undefined) && (this.model.get("user_id") == App.Models.currentUser.id)) {
      renderedContent = this.template({
        tree: this.model,
      })
    }
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  toggleNewPersonForm: function (event) {
    event.preventDefault();
    $(".new-person-form").toggle(); // toggles visibility of form
  },
  
  createNewPerson: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newPerson = new App.Models.Person(params["person"]);
  
    
    newPerson.save({}, {
      success: function () {
        $("#notice").show().html( "Person added!" ).fadeOut(3000)
         
        App.Models.currentTree.people().add(newPerson);
        App.Models.currentTree.fetch();
      },
      error: function () {
        $("#notice").show().html( "Failed to add person" ).fadeOut(3000)
      }
    });
  },
  
  
  deletePeople: function (event) {
    event.preventDefault();
    this._currDeleteView = this._currDeleteView || null
    
    if (this._currChangeHeadView) { 
      this._currChangeHeadView.remove();
      this._currChangeHeadView = null;
    }
    
    if (this._currDeleteView) { 
      this._currDeleteView.remove();
      this._currDeleteView = null;
    } else {
      var deleteView = new App.Views.DeletePeopleList({
        model: this.model
      });
      
      this._currDeleteView = deleteView;
      $("#left-content").append(deleteView.render().$el);
    };
  },
  
  changeHead: function (event) {
    event.preventDefault();
    this._currChangeHeadView = this._currChangeHeadView || null
    
    if (this._currDeleteView) { 
      this._currDeleteView.remove();
      this._currDeleteView = null;
    }
    
    if (this._currChangeHeadView) { 
      this._currChangeHeadView.remove();
      this._currChangeHeadView = null;
    } else {
      var changeHeadView = new App.Views.ChangeHead({
        model: this.model
      });
      
      this._currChangeHeadView = changeHeadView;
      $("#left-content").append(changeHeadView.render().$el);
    };
  }
});