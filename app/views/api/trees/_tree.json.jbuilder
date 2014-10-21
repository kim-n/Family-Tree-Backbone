json.(tree, :id, :name, :user_id, :created_at, :updated_at)



people ||= nil
spouseships ||= nil

unless people.nil?
  json.people(people) do |person|
    json.partial!("api/people/person", :person => person)
  end
end

unless spouseships.nil?
  json.spouseships(spouseships) do |spouseship|
    json.partial!("api/spouseships/spouseship", :spouseship => spouseship)
  end
end