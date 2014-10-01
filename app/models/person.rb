class Person < ActiveRecord::Base
  validates :name, :presence => true
  
  belongs_to :tree, class_name: "Tree", foreign_key: :tree_id, inverse_of: :people
  belongs_to :parents_relationship, class_name: "Spouseship", foreign_key: :parents_id, inverse_of: :children
  
  has_many :spouse_one_ships, class_name: "Spouseship", foreign_key: :spouse_two_id, inverse_of: :spouse_two, dependent: :destroy
  has_many :spouse_two_ships, class_name: "Spouseship", foreign_key: :spouse_one_id, inverse_of: :spouse_one, dependent: :destroy
  
  has_many :spouse_ones, through: :spouse_one_ships
  has_many :spouse_twos, through: :spouse_two_ships
  
  
  def spouses
    [].concat(self.spouse_ones).concat(self.spouse_twos)
  end
  
  def is_spouse?(person)
    spouses.include?(person)
  end
  
  def parents
    self.parents_relationship ? [].push(self.parents_relationship.spouse_one).push(self.parents_relationship.spouse_two) : []
  end
  
  def new_spouse(person)
    person ||= Person.create()
    unless is_spouse?(person)
      Spouseship.create(spouse_one_id: self.id, spouse_two_id: person.id)
    end
    person
  end
end
