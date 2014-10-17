App.Views.Main = Backbone.View.extend({
  template_home: JST["main/home"],
  template_welcome: JST["main/welcome"],
  
  events: {
    "click a.new-tree": "addTree"
  },
  
  initialize: function (options) {
    this.listenTo(App.Models.currentUser, "change", this.render);
    this.listenTo(App.Models.currentUser.trees(), "change", this.render);        
  },

  render: function () {
    
    var renderedContent = this.template_home()
    
    if ( App.Models.currentUser.is_signed_in() ) {
      App.Models.currentUser.trees().fetch()
      renderedContent = this.template_welcome()
      var treeList = new App.Views.TreeIndex();
    }
    
    this.$el.html(renderedContent);
    
    if(App.Models.currentUser.is_signed_in() ){
      $(".list-trees-container").html(treeList.render().$el)
    }
    return this;
  },
  
  addTree: function(event) {
    event.preventDefault;
    
    var newTreeView = new App.Views.TreesNew();
    $('#full-content').append(newTreeView.render().$el);
  }
});