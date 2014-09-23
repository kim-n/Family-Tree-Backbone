class Spouseship < ActiveRecord::Base
  belongs_to :spouse_one, :class_name => "Person", :foreign_key => :spouse_one_id, :inverse_of => :spouse_two_ships
  belongs_to :spouse_two, :class_name => "Person", :foreign_key => :spouse_two_id, :inverse_of => :spouse_one_ships
  belongs_to :tree, :class_name => "Tree", :foreign_key => :tree_id, :inverse_of => :spouseships
  
end
