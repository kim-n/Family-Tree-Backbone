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
  
  spouseNames: function (skip_id) {
    var namesArr = []
    var tree = this;
    _.each(this.spouse_list().models, function (spouse) {
      var spouse_one_id = spouse.get("spouse_one_id");
      var spouse_two_id = spouse.get("spouse_two_id")
      
      if ( (skip_id !== spouse_one_id) && (skip_id !== spouse_two_id) ){
        var person_one = tree.people().get(spouse_one_id);
        var person_two = tree.people().get(spouse_two_id);
        namesArr.push({
          one_name: person_one.get("name"),
          two_name: person_two.get("name"),
          id: spouse.get("id")
        })
      }
    
    });
  
    return namesArr
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