class MoviesController < ApplicationController

	def index
		@movies = Movie.all
		respond_to do |format|
			format.html
			format.xml { render xml: @movies }
		end 
	end

	def show
		@movie = Movie.find(params[:id])
		respond_to do |format|
			format.html
			format.xml { render xml: @movie }
		end 
	end

	def new
		@movie = Movie.new
	end

	def create
		@movie = Movie.new(movie_params)
		if @movie.save
			respond_to do |format|
				format.html { redirect_to @movie }
				format.xml { render xml: @movie }
			end 
		else
			respond_to do |format|
				format.html { render :new }
				format.xml { render status: 404 }
			end  
		end 
	end

	def edit
		@movie = Movie.find(params[:id])
	end

	def update
		@movie = Movie.find(params[:id])
	end

end 