class CreateSpouseships < ActiveRecord::Migration
  def change
    create_table :spouseships do |t|

      t.timestamps
    end
  end
end
