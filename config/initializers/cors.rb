Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow requests from your frontend in production
    origins 'https://benjamin-react-rails-portfolio.herokuapp.com', 'http://localhost:3000', 'https://volatic.org', 'https://www.volatic.org'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true # Set credentials to false for wildcard or specify allowed origins
  end
end
