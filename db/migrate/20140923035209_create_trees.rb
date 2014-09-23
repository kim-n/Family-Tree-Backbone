class CreateTrees < ActiveRecord::Migration
  def change
    create_table :trees do |t|
      t.string :name
      
      t.timestamps
    end
    
    add_column :people, :tree_id, :integer
  end
end
