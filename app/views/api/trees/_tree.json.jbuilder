json.(tree, :id, :name, :created_at, :updated_at)



people ||= nil

unless people.nil?
  json.people(people) do |person|
    json.partial!("api/people/person", :person => person)
  end
end