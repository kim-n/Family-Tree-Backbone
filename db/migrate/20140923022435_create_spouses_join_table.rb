class CreateSpousesJoinTable < ActiveRecord::Migration
  def change
    create_join_table :spouse_ones, :spouse_twos, :table_name => "spouseships" do |t|
      t.index [:spouse_one_id, :spouse_two_id]
      t.index [:spouse_two_id, :spouse_one_id]
    end
  end
end
