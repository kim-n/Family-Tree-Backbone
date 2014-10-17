# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


user = User.create({email: "username", password: "password"})

tree = Tree.create({name: "My Family Tree", user_id: user.id})

names = %w(Dad Me Sister Mom Brother Grandmother Grandfather Step-mom)

names.each do |person_name|
  Person.create!(name: person_name, tree_id: tree.id)
end


Spouseship.create(spouse_one_id: 1, spouse_two_id: 4, tree_id: 1) # Leslie + Dee 
Spouseship.create(spouse_one_id: 8, spouse_two_id: 1, tree_id: 1) # Leslie + SecondWife
Spouseship.create(spouse_one_id: 6, spouse_two_id: 7, tree_id: 1) # Grandmother + Grandfather

Person.where({name:"Brother"})[0].update_attribute("parents_id",1)
Person.where({name:"Me"})[0].update_attribute("parents_id",1)
Person.where({name:"Sister"})[0].update_attribute("parents_id",2)
Person.where({name:"Dad"})[0].update_attribute("parents_id",3)