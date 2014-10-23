class AddHeadToTrees < ActiveRecord::Migration
  def change
    add_column :trees, :head_id, :integer
  end
end
