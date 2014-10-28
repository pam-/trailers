Rails.application.routes.draw do
  devise_for :users
  
  root 'movies#index'
  resources :movies
  
  devise_scope :user do
    get '/sign_up', to: 'devise/registrations#new'
    get '/sign_in', to: 'devise/sessions#new'
    delete 'sign_out', to: 'devise/sessions#destroy'
  end 

  resources :users, only: [:show]
end
