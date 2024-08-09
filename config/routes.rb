Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations'}

  get 'posts/myposts'

  get 'users/:id/avatar_data', to: 'users#avatar_data'

  resources :posts do
    resources :comments, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
  end
  
  resources :users, only: [:show] do
    resources :relationships, only: [:create, :destroy]
    collection do
      get 'search'
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root 'home#about'
end
