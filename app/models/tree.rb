class Tree < ActiveRecord::Base
  validates :name, :presence => true
  
  has_many :people, class_name: "Person", foreign_key: :tree_id, inverse_of: :tree
  has_many :spouseships, :class_name => "Spouseship", :foreign_key => :tree_id, :inverse_of => :tree
  
end
