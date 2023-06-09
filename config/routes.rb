Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
    resources :students, only: [:index, :show, :create, :update, :destroy]
    resources :meetings, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
  get 'home', to: 'static_pages#root'
  get 'meetings', to: 'static_pages#root'
  get 'students', to: 'static_pages#root'

  root to: 'static_pages#root'
end
