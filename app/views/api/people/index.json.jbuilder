json.array!(@people) do |person|
  json.partial!("person", :person => person)
end