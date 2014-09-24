App.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "treesIndex",
    "trees/new": "treesNew",
    "trees/:id(/people/:person_id(/))": "treesShow",
    "trees/:id(*something)": "treesShow"
  },
  
  treesIndex: function () {
    App.Collections.trees.fetch();
    
    var indexView = new App.Views.TreesIndex({
      collection: App.Collections.trees
    });
    
    $('body').html(indexView.$el);
    
  },
  
  treesNew: function () {
    var newView = new App.Views.TreesNew();
    $("body").append(newView.render().$el)
  },
  
  treesShow: function (id, person_id) {
    var tree = App.Models.currentTree = App.Collections.trees.getOrFetch(id);
    
    var background = new App.Views.Background();
    
    $("body").html(background.render().$el);

    var showView = new App.Views.TreesShow({
      model: tree
    });

    $(".list-people").html(showView.render().$el);

    // if (parseInt(person_id) !== NaN){
    //   var showPersonView = new App.Views.PeopleShow({
    //     id: parseInt(person_id)
    //   });
    //
    //   $(".display-person").html(showPersonView.render().$el)
    // }
    
  }
  // treesShow: function (id, person_id) {
  //   var tree = App.Collections.trees.getOrFetch(id);
  //
  //   var showView = new App.Views.TreesShow({
  //     model: tree
  //   });
  //
  //   $("body").html(showView.render().$el);
  //
  //   if (parseInt(person_id) !== NaN){
  //     var showPersonView = new App.Views.Show({
  //       collection: tree.people(),
  //       id: parseInt(person_id)
  //     });
  //
  //     $(".display").html(showPersonView.render().$el)
  //   } else {
  //
  //   }
  // }
});