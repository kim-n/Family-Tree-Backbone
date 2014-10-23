App.Views.TreeCommands = Backbone.View.extend({
  template: JST["tree_commands"],
  
  tagName: "span",
  
  className: "tree-commands",
  
  events: {
    "click a.delete-people-link" : "deletePeople",
    "click a.delete-tree-link" : "deleteTree",
    "click a.change-head-link" : "changeHead",
    "click a.add-person-link" : "toggleNewPersonForm",
    "submit form.add-person-form": "createNewPerson",
    "click a.rename-tree-link" : "toggleRenameTreeForm",
    "submit form.rename-tree-form": "renameTree"
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
    $(".add-person-form").toggle(); // toggles visibility of form
  },
  
  toggleRenameTreeForm: function (event) {
    event.preventDefault();
    $(".rename-tree-form").toggle(); // toggles visibility of form
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
  },
  
  
  renameTree: function (event) {
    event.preventDefault();
    $(".rename-tree-form").toggle();
    
    var params = $(event.currentTarget).serializeJSON();
    App.Models.currentTree.save(params["tree"], {
      success: function () {
        $("#notice").show().html( "Name changed!" ).fadeOut(3000)         
      },
      error: function () {
        $("#notice").show().html( "Failed to change name" ).fadeOut(3000)
      }
    })
  },
  
  
  deleteTree: function (event) {
    var confirmation = confirm("Sure you want to delete tree?")
    if (confirmation) {
      App.Models.currentTree.destroy({
        success: function () {
          $("#notice").show().html( "Tree deleted!" ).fadeOut(3000)         
        },
        error: function () {
          $("#notice").show().html( "Failed to delete tree" ).fadeOut(3000)
        }
      })
    }
  }
});