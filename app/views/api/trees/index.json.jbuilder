json.array!(@trees) do |tree|
  json.partial!("tree", :tree => tree)
end