App.Models.Tree = Backbone.Model.extend({
  urlRoot: "/api/trees/",
  
  people: function () {
    this._people = this._people || new App.Collections.TreePeople([], {tree: this} )
    return this._people;
  }
});