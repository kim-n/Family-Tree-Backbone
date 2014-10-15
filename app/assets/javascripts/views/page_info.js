App.Views.PageInfo = Backbone.View.extend({
  template: JST["page_info"],
  
  tagName: "span",
  
  className: "page-info",

  events: {
    "submit form.delete-self-form": "deleteSelf",
    "click a.close": "closeView"
  },
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.people(), "sync", this.render);
    this.pid = options.pid
  },

  render: function () {
    var renderedContent = this.template({
      tree: this.model,
      person: this.model.people().get(this.pid)
    })
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  closeView: function () {
    event.preventDefault();
    this.remove()
  }
});