Rails.application.routes.draw do
  # Root route for the app
  root 'application#fallback_index_html'

  # Fallback route for React Router
  get '*path', to: 'application#fallback_index_html', constraints: ->(req) do
    req.method == 'GET' && !req.xhr? && req.format.html?
  end

  # API namespace for React app
  namespace :api, defaults: { format: :json } do
    resources :photos, only: [:index, :show]
    resources :projects, only: [:index, :show]
  end

  # Admin routes
  namespace :admin, module: 'admin_namespace' do
    resources :photos, only: [:index, :create, :show, :destroy]
    resources :projects, only: [:index, :create, :show]
    resources :sessions, only: [:create, :destroy]
    post "/login", to: "sessions#create"    # For POST requests (login submission)
    delete "/logout", to: "sessions#destroy"
    get "/status", to: "sessions#status"
    get "/dashboard", to: "dashboard#show"
  end

  # Top-level routes
  resources :photos, only: [:index]
  resources :projects, only: [:index]
end
