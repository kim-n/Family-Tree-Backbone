App.Models.Person = Backbone.Model.extend({
  urlRoot: "/api/people",
  
  spouse_record_hash: function (){
    var spouse_ones_list = App.Models.currentTree.spouse_list().where({"spouse_two_id":person.id});
    var spouse_twos_list = App.Models.currentTree.spouse_list().where({"spouse_one_id":person.id});
    
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
    var spouse_ones_list = App.Models.currentTree.spouse_list().where({"spouse_two_id":this.id});
    var spouse_twos_list = App.Models.currentTree.spouse_list().where({"spouse_one_id":this.id});

    var spouses = [];
    _.each(spouse_ones_list, function(record) {
      spouses.push(App.Models.currentTree.people().get(record.get("spouse_one_id")));
    });
    _.each(spouse_twos_list, function(record) {
      spouses.push(App.Models.currentTree.people().get(record.get("spouse_two_id")));
    });
    return spouses;
  },
})