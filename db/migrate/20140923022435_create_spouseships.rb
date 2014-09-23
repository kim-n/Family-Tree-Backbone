class CreateSpouseships < ActiveRecord::Migration
  create_table :spouseships do |t|
    t.integer :spouse_one_id, :null => false
    t.integer :spouse_two_id, :null => false
    t.integer :tree_id,       :null => false
  
    t.timestamps
  end
  
  
  add_index(:spouseships, :tree_id)
end
