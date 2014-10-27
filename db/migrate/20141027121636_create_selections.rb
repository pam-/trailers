class CreateSelections < ActiveRecord::Migration
  def change
    create_table :selections do |t|
    	t.references :user
    	t.references :movie
    end
    add_index :selections, [:user_id, :movie_id]
  end
end
