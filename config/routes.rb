Rails.application.routes.draw do
  # Root route for the app
  root 'application#fallback_index_html'

  namespace :admin, module: 'admin_namespace' do
    resources :photos, only: [:index, :create, :show, :destroy]
    resources :projects, only: [:index, :create, :show]
    resources :sessions, only: [:create, :destroy]
    get "/login", to: "sessions#new" 
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "/status", to: "sessions#status"
    get "/dashboard", to: "dashboard#show"
  end

  # API namespace for React app
  namespace :api, defaults: { format: :json } do
    resources :photos, only: [:index, :show]
    resources :projects, only: [:index, :show]
  end

  # Top-level routes
  resources :photos, only: [:index]
  resources :projects, only: [:index]

  # Fallback for React router
  get '*path', to: 'application#fallback_index_html', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
