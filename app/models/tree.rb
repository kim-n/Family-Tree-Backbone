class Tree < ActiveRecord::Base
  validates :name, :presence => true
  
  has_many :people, class_name: "Person", foreign_key: :tree_id, inverse_of: :tree
  
end
