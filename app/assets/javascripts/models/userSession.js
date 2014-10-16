App.Models.UserSession = Backbone.Model.extend({
  urlRoot: "/api/sessions/",
  
  trees: function () {
    this._trees = this._trees || new App.Collections.Trees([], {user: this} )
    return this._trees;
  },
  
  is_signed_in: function() {
    return this.attributes.email !== undefined
  }
});