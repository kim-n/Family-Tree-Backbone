class AddParentsIdToPerson < ActiveRecord::Migration
  def change
    add_column :people, :parents_id, :integer
  end
end
