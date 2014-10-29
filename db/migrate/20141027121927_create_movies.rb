class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
    	t.string :name #change to title dammit
    	t.string :poster
    	t.text :synopsis
    	t.string :release_date
        t.string :status
    end
  end
end
