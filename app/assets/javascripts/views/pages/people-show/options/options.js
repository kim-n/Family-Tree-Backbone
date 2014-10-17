App.Views.PersonShowOptions = Backbone.View.extend({
  template: JST["people/show_options"],
  
  className: "person-options floating-subview",
  
  events: {
    "click .new-parents-icon": "addParents",
    "click .new-spouse-icon": "addSpouse",
    "click .delete-person-icon": "deleteSelf",
    "click .edit-person-icon": "editSelf"
  },
  
  initialize: function(options){
    this.person_id = options.person_id;
    this.person_local_id = options.person_local_id;
  },
  
  render: function () {
    var renderedContent = this.template({
      person_id: this.person_id,
      person_local_id: this.person_local_id
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },

  
  _buildSubView: function(event, viewClassName, View, container) {
    container = typeof(container) === "undefined" ? 'body' : container
    console.log("Building " + viewClassName + " subview")
    event.preventDefault();
    
    var person_id = $(event.currentTarget).attr("class").split(" ").pop();
    var person = App.Models.currentTree.people().get(person_id)
    
    $(viewClassName).remove()
    $(".floating-subview").remove()
    
    var newView = new View({
      model: person
    })
    
    $(container).append(newView.render().$el)
    
    $(viewClassName).css({
      top: event.pageY - 10,
      left: event.pageX - 10
    });
  },
  
  
  addParents: function (event) {
    console.log("add parents clicked")
    this._buildSubView(event, ".add-parents", App.Views.PersonNewParents);
  },
  
  addSpouse: function (event) {
    console.log("add spouse clicked")    
    this._buildSubView(event, ".add-spouse", App.Views.PersonNewSpouse);
  },
  
  deleteSelf: function (event) {
    console.log("delete self clicked")
    this._buildSubView(event, ".delete-self", App.Views.PersonDeleteSelf);
  },
  
  editSelf: function (event) {
    console.log("edit self clicked")
    this._buildSubView(event, ".edit-self", App.Views.PersonEditSelf, '.people-container');
        
    var person_classes = $(event.currentTarget).attr("class").split(" ")
    
    var person_id = person_classes.pop();
    var person_local_id = person_classes.pop();
    
    var $person = $("#" + person_local_id);
    var $parent_object = $('[data-id="' + person_id + '"]');
    
    var offset = ( $parent_object.width() - $person.width() ) / 2;
    
    $(".edit-self").css({
      top: $parent_object.position().top,
      left: $parent_object.position().left + offset - 2
    });
  }
  
})