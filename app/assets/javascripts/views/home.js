App.Views.Home = Backbone.View.extend({
  template_home: JST["home"],
  template_welcome: JST["welcome"],
  
  events: {
    "click a.new-tree": "addTree"
  },
  
  initialize: function (options) {
    this.listenTo(App.Models.currentUser, "change", this.render);
  },

  render: function () {
    
    var renderedContent = this.template_home()
    
    if ( App.Models.currentUser.is_signed_in() ) {
      renderedContent = this.template_welcome({
        trees: App.Models.currentUser.trees()
      })
    }
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  addTree: function(event) {
    event.preventDefault;
    
    var newTreeView = new App.Views.TreesNew();
    $('#full-content').append(newTreeView.render().$el);
  }
});