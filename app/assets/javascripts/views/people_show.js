// Assumes App.Model.currentTree is loaded as well as 
// App.Models.currentTree.people()

App.Views.PeopleShow = Backbone.View.extend({
  template: JST["people/show"],
  
  events: {
    "click .child-dot": "createChild",
    "click .spouse-line": "createChild",
    
    "click .person-object": "showOptions",
    
    "mouseover .person-object": "highlight",
    "mouseleave .person-object": "unhighlight",
    
    "mouseover .spouse-line": "enlargen",
    "mouseleave .spouse-line": "unenlargen",
    
    "mouseover .child-dot": "enlargen",
    "mouseleave .child-dot": "unenlargen"
  },
  
  initialize: function (options){
    this.pid = options.pid;
    this.listenTo(App.Models.currentTree, "sync", this.render);
    this.listenTo(App.Models.currentTree, "sync", this.makePretty);
  },
  
  render: function () {
    this.$el.empty();
    // this.remove();
    this.unbind();
    console.log(" people show rendered ")
    
    var person = App.Models.currentTree.people().get(this.pid)

    var renderedContent = this.template({ 
      person: person
    });
    
        
    this.$el.html(renderedContent);
    this.delegateEvents();
    
    return this;
  },
  
  
  closeView: function (event) {
    event.preventDefault();
    this.remove();
  },
  
  showOptions: function (event) {
    console.log("options clicked")    
    
    var $personObject = $(event.currentTarget)
    var person_id = $personObject.attr("class").split(" ").pop();
        
    console.log("local id", $personObject.attr("id"))
    $(".floating-subview").remove();  // Remove old subviews above person show view
    var newOptionsView = new App.Views.PersonShowOptions({
      person_id: person_id,
      person_local_id: $personObject.attr("id")
    })
    
    var offset = ($personObject.parent().width() - $personObject.width() ) /2
    
    var newPositions = {
      top: $personObject.parent().position().top - 15,
      left: $personObject.parent().position().left + offset
    }
    
    $('.people-container').append(newOptionsView.render().$el);
    $(".person-options-icons").css(newPositions);    
  },
  
  
  createChild: function(event){
    console.log("create child clicked")
    
    var classes = $(event.currentTarget).attr("class").split(" ");
    var parent_one_id = parseInt(classes.pop());
    var parent_two_id = parseInt(classes.pop());
  
    var parents_spouse_record = App.Models.currentTree.spouse_list().where({"spouse_one_id":parent_one_id, "spouse_two_id":parent_two_id}).concat(
      App.Models.currentTree.spouse_list().where({"spouse_one_id":parent_two_id, "spouse_two_id":parent_one_id})
    );
    
    $(".floating-subview").remove();  // Remove old subviews above person show view
    var newChildView = new App.Views.PersonNewChild({
      parents_id: parents_spouse_record[0].id
    });
        
    $('body').append(newChildView.render().$el);
    $(".add-child").css({
      top: event.pageY - 10,
      left: event.pageX - 10
    });
  },
  
  
  highlight: function (event) {  
    var $person = $(event.currentTarget).parent();
    var person_id = $person.data("id");
    
    $person.children('.person-object').css({"border" : "2px solid red"})
      
    var list_spouses =  [];
      
    if($person.hasClass('child')){
      list_spouses = $(".spouse." + person_id);
    }
    else if($person.hasClass('spouse')){
      var lastClass = $person.attr('class').split(' ').pop();
      list_spouses = $('[data-id='+ lastClass +']');
    }
      
    for(var i = 0; i < list_spouses.length; i++){
      var $spouse = $(list_spouses[i]);
      $spouse.children('.person-object').css({"border" : "2px solid red"})
      var spouse_id = $spouse.data("id");
      var list_children = $(".child." + spouse_id + "." + person_id);

      for(var j = 0; j < list_children.length; j++){
        var $child = $(list_children[j]);
        $child.children('.person-object').css({"border" : "2px solid red"})
    
      }
      $('.parent-line.'+ person_id +'.'+ spouse_id).css( { "background" : "red", "border-color" : "red"  } );
      $('.child-line.'+ person_id +'.'+ spouse_id).css( { "background" : "red", "border-color" : "red"  } );
      $('.spouse-line.'+ person_id +'.'+ spouse_id).css( { "background" : "red", "border-color" : "red" } );
      $('.horizontal-line.'+ person_id +'.'+ spouse_id).css( { "background" : "red", "border-color" : "red"  } );
      $('.child-dot.'+ person_id +'.'+ spouse_id).css( { "background" : "red" } );
    }
  },
  
  unhighlight: function (event) {
    $('.person-object').css({"border": "2px solid transparent"});
    $('.line').css({"background": "green", "border-color" : "green" });
    $('.child-dot').css({"background" : "green"});   
  },
  
  
  enlargen: function (event) {
    
    $line = $(event.currentTarget);
    var classes = $line.attr('class').split(' ');
    var prnt1_id = classes.pop();
    var prnt2_id = classes.pop();
    
    $(".line.child-dot." + prnt1_id + "." + prnt2_id).css({"height" : "7px", "width" : "7px", "background" : "red"});
    $(".line.spouse-line." + prnt1_id + "." + prnt2_id).css({"height" : "4px", "background" : "red", "margin-top" : "-2px"});

  },
  
  unenlargen: function (event) {
    $(".child-dot").css({"height" : "4px", "width" : "4px", "background" : "green"});
    $(".spouse-line").css({"height" : "1px", "background" : "green", "margin-top" : "0px"})
  },
  
  // Utility: drawing lines
  drawLine: function (properties, classes){  
    classes = typeof classes !== 'undefined' ? classes : "";  // if no class is given 
    
    $CONTAINER = $('.people-container');  // FIX: hardcoded container
    
    $CONTAINER.append("<div class='line current-line "+ classes +"'></div>")
  
    var $line = $('.current-line')
    $line.css(properties)
    $line.toggleClass( "current-line" );
  
    return $line
  },

  // Utility: adjusting lines
  adjustLine: function ($line, properties){
    $line.css(properties) 
  },

  checkIntersect: function () {
    var horiz_lines = $('.horizontal-line')
    var modified = true;
    while(modified){
      modified = false
      for(var i=0; i < horiz_lines.length; i++){
        if(check_line_intersection($(horiz_lines[i]))){
          modified = true;
        }
      }
    }
  },

  changeWindowSize: function (newValue) {
    WINDOW_SIZE = parseInt(newValue);
    this.display();
  },

  changeSpaceBtwLevel: function (newValue){
    SPACE_btw_LEVEL = parseInt(newValue);  //50
    this.display();
  },

  changeSpaceBtwPeople: function (newValue){
    SPACE_btw_PEOPLE = parseInt(newValue);  //30
    this.display();
  },

  check_line_intersection: function ($line){
    var line_top = $line.position().top;
    var line_left = $line.position().left;
    var line_width = $line.width();
    var line_right = line_left + line_width;
  
    var other_line;
    var other_top;
    var other_left;
    var other_width;
    var other_right;

    var horiz_lines = $('.horizontal-line')
    for(var i=0; i < horiz_lines.length; i++){
      if(horiz_lines.index($line) == i){ continue;}
      other_line = $(horiz_lines[i]);
      other_top = other_line.position().top;
      other_left = other_line.position().left;
      other_width = other_line.width();
      other_right = other_left + other_width;
      if(line_top == other_top && ( line_right != other_right && line_left != other_left)){
        if( (other_left-1 < line_right &&  other_left+1 > line_left) || (other_right-1 < line_right &&  other_right+1 > line_left)){
          this.adjustLine($line, {
            "top": line_top - 10 ,
          });
        }
      }
    }
  },

  connectAllLines: function ($top_line, list_bottom_lines){
    var line_classes = $top_line.attr('class').split(' ')
    var classes = "horizontal-line " + line_classes.pop() + " " + line_classes.pop();
    var left_child = $(list_bottom_lines[0]);
    var right_child = $(list_bottom_lines[0]);
    var next_child;
    for(var i=1; i < list_bottom_lines.length; i++){
      next_child = $(list_bottom_lines[i]);
      if (next_child.position().left < left_child.position().left){
        left_child = next_child;
      }
      if (next_child.position().left > right_child.position().left){
        right_child = next_child;
      }
    }
  
  
    var new_top = $top_line.position().top + $top_line.height();
    var new_left = $top_line.position().left;
    var new_width = Math.abs($top_line.position().left - right_child.position().left);
  
    if(list_bottom_lines.length > 1){
      if(left_child.position().left < $top_line.position().left){
        new_left = left_child.position().left;
        new_width = right_child.position().left - left_child.position().left;
      } 
      if(right_child.position().left < $top_line.position().left){
        new_left = left_child.position().left;
        new_width = $top_line.position().left - left_child.position().left;
      } 
    }
    else {  
      if(left_child.position().left < $top_line.position().left){
        new_left = left_child.position().left;
        new_width = $top_line.position().left - left_child.position().left;
      } 
      if(left_child.position().left > $top_line.position().left){
        new_width = left_child.position().left - $top_line.position().left;
      } 
    }

    var $line = this.drawLine({
      "width": new_width,
      "left": new_left,
      "top": new_top
    }, classes)


    this.check_line_intersection($line);
  
    this.adjustLine($top_line, {
      "top": $top_line.position().top,
      "height": $line.position().top -  $top_line.position().top
    });

    for(var i=0; i < list_bottom_lines.length; i++){
      $bottom_line = $(list_bottom_lines[i]);
    
      var oldBottom = $bottom_line.position().top + $bottom_line.height()

      this.adjustLine($bottom_line, {
        "top": $line.position().top,
        "height": oldBottom - $line.position().top
      });

    }
  
    // var oldBottom = $bottom_line.position().top + $bottom_line.height()
    //
    // adjustLine($bottom_line, {
    //   "top": $line.position().top,
    //   "height": oldBottom - $line.position().top
    // });
  
  },

  // Utility: connects two lines horizontally; raising bottom line if not alligned
  connectLines: function ($top_line, $bottom_line){

    var classes = "horizontal-line"
    var new_width = Math.abs($top_line.position().left - $bottom_line.position().left);
    var new_top = $top_line.position().top + $top_line.height();
    var new_left = $top_line.position().left;
  
    // if the top line is to the right of the bottom line
    if($top_line.position().left > $bottom_line.position().left){
      new_left = $bottom_line.position().left
    }
  
    var $line = this.drawLine({
      "width": new_width,
      "left": new_left,
      "top": new_top
    }, classes)
  
    // check_line_intersection($line);
    var oldBottom = $bottom_line.position().top + $bottom_line.height()
  
    this.adjustLine($bottom_line, {
      "top": $line.position().top,
      "height": oldBottom - $line.position().top
    });
  
  },

  connectParentAndChildLines: function (parent1_id, parent2_id){
    var $parent_line = $('.parent-line.' + parent1_id + '.' + parent2_id)
    var list_child_lines = $('.child-line.' + parent1_id + '.' + parent2_id)

    this.connectAllLines($parent_line, list_child_lines)
  
    // for(var i=0; i< list_child_lines.length; i++){
    //   var $child_line = $(list_child_lines[i]);
    //   connectLines($parent_line, $child_line)
    // }
  },


  printLineToParent: function ($person, parent1_id, parent2_id){
    var start_pos = $person.position(); // person is child
  
    var classes = "child-line " + parent1_id + ' ' + parent2_id
    var new_height = $person.height()
    var new_top = start_pos.top - $person.height(); //
    var new_left = start_pos.left + $person.width()/2; // line is posi

    this.drawLine({
      "height": new_height,
      "left": new_left,
      "top": new_top
    }, classes)
  },

  // Print vertical line from parentsLine to children
  printLineToChildren: function ($person, spouse_id, modifier, space_btw_people){
    var start_pos = $person.position();
  
    var classes = "parent-line " + $person.data("id")+ ' ' + spouse_id
    var new_left = start_pos.left - (space_btw_people/2); // subtract half of SPACE_btw_PEOPLE to center line between people
    var new_top = start_pos.top  + modifier * 78 + 2;

    this.drawLine({
      "left": new_left,
      "top": new_top
    }, classes)
  },


  // Print lines between spouses
  printLineToSpouse: function ($person, $spouse, person_object_width, modifier) {
    var start_pos = $person.position();
    var end_pos = $spouse.position();
    var classes = $person.data("id") + " " + $spouse.data("id");
  
    var horizontal_distance = Math.abs($person.position().left - $spouse.position().left) - person_object_width;
  
    var line_left = $person.position().left + $person.width()/2 + person_object_width/2;   // start of line is right of $person
  
    var line_top = $person.position().top + $person.height() - $person.height()*modifier // line height should be in middle of $person height
  
    $line = this.drawLine({
      "width": horizontal_distance,
      "left": line_left,
      "top": line_top
    }, "spouse-line " + classes);

    this.drawLine({
      "left": line_left-4,
      "top": line_top-3
    }, "dot child-dot " + classes);
  
    this.drawLine({
      "left": line_left + horizontal_distance-5,
      "top": line_top-4
    }, "dot child-dot " + classes);
  },


  // Delegates printing of all lines
  printLines: function ($person, person_object_width, space_btw_people){
    var person_id = $person.data("id");
    var list_spouses = $(".spouse." + person_id)
    for(var i = 0; i < list_spouses.length; i++){
      var $spouse = $(list_spouses[i]);

      // print horizontal line between spouses
      this.printLineToSpouse($person, $spouse, person_object_width, (i+1)/(list_spouses.length+1))
    
      var spouse_id = $spouse.data("id");
      var list_children = $(".child." + spouse_id + "." + person_id);
    
      if(list_children.length > 0){
        // print vertical line below line between parents
        this.printLineToChildren($spouse, person_id,  (list_spouses.length-i)/(list_spouses.length+1), space_btw_people )
      }
    
      for(var j = 0; j < list_children.length; j++){
        var $child = $(list_children[j]);
        // recursive call to print children
        this.printLines($child, person_object_width, space_btw_people);
      
        // prints vertical live above person
        this.printLineToParent($child, spouse_id, person_id)
        // prints horizontal line between all children and line produced by printLineToChildren[ln: ~206]
        // connectParentAndChildLines(spouse_id, person_id)
      }
    
      if(list_children.length > 0){
        // prints horizontal line between all children and line produced by printLineToChildren[ln: ~206] 
        this.connectParentAndChildLines(spouse_id, person_id)
      }
    
    }
  },


  // prints people onto page based on Level-# class
  printByLevel: function (window_size, level_num, space_btw_people, space_btw_level){
    var $people = $(".Level-" + level_num); // all people at level level_num

    var margin = (window_size)/ ($people.length) +  (space_btw_people * $people.length-1)// max horizontal space allowed per person
    
    for(var i = 0; i < $people.length; i++){
      var $person = $($people[i]);
      $person.width(margin-space_btw_people); // set width of person object to be max allowed horizonal space
                                                  // minus the specified space between 2 people
    
      $person.css("top", space_btw_level * level_num);  // position relative to top of parent people-container
      $person.css("left", margin * i); // position relative to left of parent people-container
    }
  },


  printPeople: function (window_size, max_level, space_btw_people, space_btw_level){
    var level = 0;  // initial level
    
    while(level <= max_level){
      this.printByLevel(window_size, level, space_btw_people, space_btw_level);
      level++;
    }
  },

  display: function ($first_person, max_level, window_size, space_btw_level, space_btw_people, person_object_width) {
    $('.line').remove();
    this.printPeople(window_size, max_level, space_btw_people, space_btw_level);
    this.printLines($first_person, person_object_width, space_btw_people);
  },

  maxes: function (){
    var level = 0;  // initial level
    var max_people = 0;
    var people_on_level = $('.Level-' + level).length;
    while(people_on_level != 0){
      max_people = people_on_level > max_people ? people_on_level : max_people
      level++;
      people_on_level = $('.Level-' + level).length;
    }
    return [level-1, max_people]
  },
  
  align_parent_dots: function () {
    var $parent_dots = $('.parent-dot')
    
    _.each($parent_dots, function (parent_dot){
      var $dot = $(parent_dot);
      var person_id = parseInt($dot.attr("class").split(" ").pop());
      var $person = $('[data-id="' + person_id +'"]');

      var newPosition = $person.position();
      newPosition.left = newPosition.left + ($person.width()/2)
      
      $dot.css(newPosition)
      console.log(newPosition)
    });
  },
  
  
  makePretty: function () {
    var max = this.maxes();
    var maxPeople = max[1];
    var maxLevel = max[0];
 
    // Globals
    var SPACE_BTW_LEVEL = 150;  //50
    var SPACE_BTW_PEOPLE = 20;  //30
    var MIN_PERSON_WIDTH = 90;  //90
    var PEOPLE_HEIGHT = 30; //30
    var PERSON_OBJECT_WIDTH = 75;

    var WINDOW_SIZE = (MIN_PERSON_WIDTH + SPACE_BTW_PEOPLE) * (maxPeople + 1);
    console.log("WINDOW SIZE", WINDOW_SIZE, maxLevel)
    var $CONTAINER = $('.people-container') // hard coded in draw-line
    var $FIRST_PERSON = $($('.child')[0]);

   $('#window-size').val(WINDOW_SIZE);
   $('#level-space').val(SPACE_BTW_LEVEL);
   $('#people-space').val(SPACE_BTW_PEOPLE);
      

   // Prints people, then lines
   this.display($FIRST_PERSON, maxLevel, WINDOW_SIZE, SPACE_BTW_LEVEL, SPACE_BTW_PEOPLE, PERSON_OBJECT_WIDTH);
   this.align_parent_dots();
  }
  
});