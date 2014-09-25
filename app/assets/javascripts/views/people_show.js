// Assumes App.Model.currentTree is loaded as well as 
// App.Models.currentTree.people()

App.Views.PeopleShow = Backbone.View.extend({
  template: JST["people/show"],

  render: function () {
    console.log(" people show rendered ")
    
    var person = App.Models.currentTree.people().get(this.id)

    var renderedContent = this.template({ 
      person: person
    });
        
    this.$el.append(renderedContent);
    
    return this;
  },
  
  // Utility: drawing lines
  drawLine: function (properties, classes){  
    classes = typeof classes !== 'undefined' ? classes : "";  // if no class is given
  
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
    this.make_pretty();
  },

  changeSpaceBtwLevel: function (newValue){
    SPACE_BETWEEN_LEVEL = parseInt(newValue);  //50
    this.make_pretty();
  },

  changeSpaceBtwPeople: function (newValue){
    SPACE_BETWEEN_PEOPLE = parseInt(newValue);  //30
    this.make_pretty();
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

    var $line = drawLine({
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
  printLineToChildren: function ($person, spouse_id, modifier){
    var start_pos = $person.position();
  
    var classes = "parent-line " + $person.attr("id")+ ' ' + spouse_id
    var new_left = start_pos.left - (SPACE_BETWEEN_PEOPLE/2); // subtract half of SPACE_BETWEEN_PEOPLE to center line between people
    var new_top = start_pos.top  + modifier * 78;

    this.drawLine({
      "left": new_left,
      "top": new_top
    }, classes)
  },


  // Print lines between spouses
  printLineToSpouse: function ($person, $spouse, modifier) {
    var start_pos = $person.position();
    var end_pos = $spouse.position();
    var classes = $person.attr("id") + " " + $spouse.attr("id");
  
    var horizontal_distance = Math.abs($person.position().left - $spouse.position().left) - PERSON_OBJECT_WIDTH;
  
    var line_left = $person.position().left + $person.width()/2 + PERSON_OBJECT_WIDTH/2;   // start of line is right of $person
  
    var line_top = $person.position().top + $person.height() - $person.height()*modifier // line height should be in middle of $person height
  
    $line = this.drawLine({
      "width": horizontal_distance,
      "left": line_left,
      "top": line_top
    }, "spouse-line " + classes);

    this.drawLine({
      "left": line_left-4,
      "top": line_top-3
    }, "dot " + classes);
  
    this.drawLine({
      "left": line_left + horizontal_distance-5,
      "top": line_top-4
    }, "dot " + classes);
  },


  // Delegates printing of all lines
  printLines: function ($person){
    var person_id = $person.attr("id");
    var list_spouses = $(".spouse." + person_id)
    for(var i = 0; i < list_spouses.length; i++){
      var $spouse = $(list_spouses[i]);

      // print horizontal line between spouses
      this.printLineToSpouse($person, $spouse, (i+1)/(list_spouses.length+1))
    
      var spouse_id = $spouse.attr("id");
      var list_children = $(".child." + spouse_id + "." + person_id);
    
      if(list_children.length > 0){
        // print vertical line below line between parents
        this.printLineToChildren($spouse, person_id,  (list_spouses.length-i)/(list_spouses.length+1))
      }
    
      for(var j = 0; j < list_children.length; j++){
        var $child = $(list_children[j]);
        // recursive call to print children
        this.printLines($child, (i+1)/(list_spouses.length+1));
      
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
  printByLevel: function (window_size, level_num){
    var $people = $(".Level-" + level_num); // all people at level level_num

    var margin = (window_size)/ ($people.length) +  (SPACE_BETWEEN_PEOPLE * $people.length-1)// max horizontal space allowed per person
  
    for(var i = 0; i < $people.length; i++){
      var $person = $($people[i]);
      $person.width(margin-SPACE_BETWEEN_PEOPLE); // set width of person object to be max allowed horizonal space
                                                  // minus the specified space between 2 people
    
      $person.css("top", SPACE_BETWEEN_LEVEL * level_num);  // position relative to top of parent people-container
      $person.css("left", margin * i); // position relative to left of parent people-container
    }
  },


  printPeople: function (window_size, max_level){
    var level = 0;  // initial level
  
    while(level <= max_level){
      this.printByLevel(window_size, level);
      level++;
    }
  },

  make_pretty: function () {
    console.log(WINDOW_SIZE, SPACE_BETWEEN_LEVEL, SPACE_BETWEEN_PEOPLE)
    // $('.person').css({"top": 0, "left": 0})
    $('.line').remove();
    this.printPeople(WINDOW_SIZE, maxLevel);
    // this.printLines($FIRST_PERSON);
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
    return [level, max_people]
  },
  
  display: function () {
    max = this.maxes();
    maxPeople = max[1];
    maxLevel = max[0];
 
    // Globals
    SPACE_BETWEEN_LEVEL = 150;  //50
    SPACE_BETWEEN_PEOPLE = 20;  //30
    MIN_PERSON_WIDTH = 90;  //90
    PEOPLE_HEIGHT = 30; //30
    PERSON_OBJECT_WIDTH = 75;

    WINDOW_SIZE = (MIN_PERSON_WIDTH + SPACE_BETWEEN_PEOPLE) * (maxPeople + 1);
    $CONTAINER = $('.people-container')
    $FIRST_PERSON = $($('.child')[0]);

   $('#window-size').val(WINDOW_SIZE);
   $('#level-space').val(SPACE_BETWEEN_LEVEL);
   $('#people-space').val(SPACE_BETWEEN_PEOPLE);

   // Prints people, then lines
   this.make_pretty();
  }
  
});