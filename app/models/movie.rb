class Movie < ActiveRecord::Base
	has_many :users, through: :selections
end 