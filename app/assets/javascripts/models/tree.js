App.Models.Tree = Backbone.Model.extend({
  urlRoot: "/api/trees/",
  
  people: function () {
    this._people = this._people || new App.Collections.TreePeople([], {tree: this} )
    return this._people;
  },
  
  spouse_list: function () {
    this._spouse_list = this._spouse_list || new App.Collections.SpouseList([], {tree: this} )
    return this._spouse_list;
  },
  
  parse: function (payload) {
    // convert people json data to people objects client side
    // then remove people json data from payload (which is tree data)
    if (payload.people) {
      this.people().set(payload.people, {parse: true});
      delete payload.people; 
    }
     
    if (payload.spouseships) {
      this.spouse_list().set(payload.spouseships, {parse: true});
      delete payload.spouseships; 
    }
    
    return payload;
  }
});