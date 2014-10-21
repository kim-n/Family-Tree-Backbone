class AddConstraintsAndIndexes < ActiveRecord::Migration
  def change
    add_index :users, :email, :unique => true
    
    change_column :trees, :name, :string, :null => false
    change_column :trees, :user_id, :integer, :null => false
    add_index :trees, :user_id
    add_index :trees, [:name, :user_id]
    
    change_column :people, :tree_id, :integer, :null => false
    add_index :people, :tree_id    
  end
end
