window.App = {
  Collections: {},
  Models: {},
  Views: {},
  
  initialize: function () {
    App.Collections.trees.fetch({
      success: function(){
        console.log("SUCCESS")
      }
    })
  }
};

$(App.initialize)

