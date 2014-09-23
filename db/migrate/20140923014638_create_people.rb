class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :name, :null => false, :default => "Unknown"
      t.timestamps
    end
  end
end
