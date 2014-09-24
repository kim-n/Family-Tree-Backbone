# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tree = Tree.create(name: "FIRST TREE")

names = %w(Leslie Alexander Kimberly Dee Aleister Grandmother Grandfather SecondWife)

names.each do |person_name|
  Person.create!(name: person_name, tree_id: tree.id)
end

Spouseship.create(spouse_one_id: 1, spouse_two_id: 4, tree_id: 1)
Spouseship.create(spouse_one_id: 8, spouse_two_id: 1, tree_id: 1)
Spouseship.create(spouse_one_id: 6, spouse_two_id: 7, tree_id: 1)
