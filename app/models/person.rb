class Person < ActiveRecord::Base
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:attachment/missing_:style.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  
  validates :name, :presence => true
  
  belongs_to :tree, class_name: "Tree", foreign_key: :tree_id, inverse_of: :people
  belongs_to :parents_relationship, class_name: "Spouseship", foreign_key: :parents_id, inverse_of: :children
  
  has_many :spouse_one_ships, class_name: "Spouseship", foreign_key: :spouse_two_id, inverse_of: :spouse_two, dependent: :destroy
  has_many :spouse_two_ships, class_name: "Spouseship", foreign_key: :spouse_one_id, inverse_of: :spouse_one, dependent: :destroy
  
  has_many :spouse_ones, through: :spouse_one_ships
  has_many :spouse_twos, through: :spouse_two_ships
  
  
  def children
    childrenArr = []
    spouseships = [].concat(self.spouse_one_ships).concat(self.spouse_two_ships)
    spouseships.each do |spouseship|
      childrenArr.concat( Person.where( {parents_id: spouseship.id} ) )
    end
    childrenArr
  end
  
  def spouses
    [].concat(self.spouse_ones).concat(self.spouse_twos)
  end
  
  def is_spouse?(person)
    spouses.include?(person)
  end
  
  def parents
    self.parents_relationship ? [].push(self.parents_relationship.spouse_one).push(self.parents_relationship.spouse_two) : []
  end

end
