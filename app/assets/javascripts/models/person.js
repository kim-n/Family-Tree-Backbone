App.Models.Person = Backbone.Model.extend({
  urlRoot: "/api/people",
  
  _spouse_list: function () {
    var spouse_ones_list = App.Models.currentTree.spouse_list().where({"spouse_two_id":this.id});
    var spouse_twos_list = App.Models.currentTree.spouse_list().where({"spouse_one_id":this.id});
    return { "one" : spouse_ones_list, "two" : spouse_twos_list }
  },
  
  spouse_record_hash: function (){
    var spouse_list = this._spouse_list();
    var spouse_ones_list = spouse_list["one"];
    var spouse_twos_list = spouse_list["two"];
    
    var spouse_record_list = {};
    _.each(spouse_ones_list, function(record) {
      spouse_record_list[record.get("spouse_one_id")] =  record.id;
    });
    _.each(spouse_twos_list, function(record) {
      spouse_record_list[record.get("spouse_two_id")] =  record.id;
    });
    return spouse_record_list;
  },
  
  spouses: function () {
    var spouse_list = this._spouse_list();
    var spouse_ones_list = spouse_list["one"];
    var spouse_twos_list = spouse_list["two"];
    
    var spouses = [];
    _.each(spouse_ones_list, function(record) {
      spouses.push(App.Models.currentTree.people().get(record.get("spouse_one_id")));
    });
    _.each(spouse_twos_list, function(record) {
      spouses.push(App.Models.currentTree.people().get(record.get("spouse_two_id")));
    });
    return spouses;
  },
  
  parents: function () {
    var parents = [];
    if (this.get("parents_id") !== null) {
      var parents_record = App.Models.currentTree.spouse_list().get(this.get("parents_id"));
      
      parents.push(App.Models.currentTree.people().get(parents_record.get("spouse_one_id")))
      parents.push(App.Models.currentTree.people().get(parents_record.get("spouse_two_id")))
    }
    
    return parents;
  },
  
  children: function () {
    var people = App.Models.currentTree.people();
    var spouse_list = this._spouse_list();
    var spouse_list = spouse_list["one"].concat(spouse_list["two"]);
        
    var children = [];
    _.each(spouse_list, function(record) {
      var child = people.where({"parents_id": record.id});
      children = children.concat(child);
    });
    return children;
  },
  
  related: function () {
    var children = this.children();
    var spouses = this.spouses();
    var parents = this.parents();
    return children.concat(spouses).concat(parents);
  },
  
  unrelated: function () {
    var people = App.Models.currentTree.people().models;
    var related = this.related().concat(this);
    
    _.each(related, function (familyMember) {
      people = _.without(people, familyMember)
    })
    
    return people;
  },
    
  print_info: function () {
    var arr = [];
    var level = 0;
    var parents_ids = "";
  
    if ( this.get("parents_id") !== null ) {
      var parents = this.parents();
      arr.push({"person": parents[0], "classes": "person Level-" + level + " child none" });
      arr.push({"person": parents[1], "classes": "person Level-" + level + " spouse " + parents[0].id });
      level = level + 1
      parents_ids = [parents[0].id, parents[1].id].join(" ")
    }
    return this._print_person( arr, level, parents_ids)
  },

  _print_person: function (arr, level, parents_ids) {
    var person = this;
    
    arr.push({"person": person, "classes": "person Level-" + level + " child " + parents_ids })
    
    var spouse_records = person.spouse_record_hash();
     _.each(person.spouses(), function (spouse) {
       arr.push({"person": spouse, "classes": "person Level-" + level + " spouse " + person.id })
       
       var children = App.Models.currentTree.people().where({"parents_id": spouse_records[spouse.id]});
       _.each(children, function (child) {
         child._print_person(arr, level+1, [person.id, spouse.id].join(' '));
       });
       
     });
    
    return arr; 
   }
  
})