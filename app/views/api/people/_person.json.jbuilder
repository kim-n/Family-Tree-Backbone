json.(person, :id, :tree_id, :name, :parents_id, :created_at, :updated_at)


spouseship ||= nil

unless spouseship.nil?
  json.partial!("api/spouseships/spouseship", :spouseship => spouseship)
end