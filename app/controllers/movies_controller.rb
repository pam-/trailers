class MoviesController < ApplicationController

	def index

	end

	def show
		@movie = Movie.find(params[:id])
		respond_to do |format|
			format.html
			format.json { render json: @movie }
		end 
	end

	def new
		@movie = Movie.new
	end

	def create
		@movie = current_user.movies.create(movie_params)
		if @movie.save
			respond_to do |format|
				format.html { redirect_to movies_path }
				format.json { render json: @movie }
			end 
		else
			respond_to do |format|
				format.html { render :new }
				format.json { render status: 404 }
			end  
		end 
	end

	def edit
		@movie = Movie.find(params[:id])
	end

	def update
		@movie = Movie.find(params[:id])
	end

	private 
	def movie_params
		params.require(:movie).permit(:name, :synopsis, :release_date)
	end

end 