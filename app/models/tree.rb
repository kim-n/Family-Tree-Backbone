class Tree < ActiveRecord::Base
  validates :name, :presence => true
  
  validate :name_is_unique
  # When tree is deleted -> all people in tree also deleted
  has_many :people, class_name: "Person", foreign_key: :tree_id, inverse_of: :tree, dependent: :destroy
  # No need to destroy spouseships when tree is being deleted, spouseships ar deleted when either spouse is deleted.
  has_many :spouseships, :class_name => "Spouseship", :foreign_key => :tree_id, :inverse_of => :tree
  belongs_to :owner, class_name: "User", foreign_key: :user_id, inverse_of: :trees
  belongs_to :head, class_name: "Person", foreign_key: :head_id
  
  def name_is_unique
    owner.trees.each do |tree|
      if tree.name.downcase == name.downcase
        errors.add(:name, 'already exists')
        break;
      end
    end
  end
  
end
