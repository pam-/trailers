class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
    	t.string :name
    	t.string :trailer_link
    	t.text :synopsis
    	t.string :release_date
    	t.string :reminder_date
    end
    add_index :movies, :name
    add_index :movies, :trailer_link
    add_index :movies, :release_date 
    add_index :movies, :reminder_date
  end
end
