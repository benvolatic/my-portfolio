require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Enable cookies for sessions
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Add middleware for cross-origin requests (CORS)
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*' # Update with specific origins in production
        resource '*',
                 headers: :any,
                 methods: %i[get post put patch delete options head],
                 credentials: true
      end
    end

    # Allow the Rails app to serve static files (for the React build)
    config.public_file_server.enabled = true

    # Enable fallback to index.html for React routing
    config.middleware.use Rack::Static,
                          urls: ["/"],
                          root: "public",
                          index: "index.html"

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Remove this if you don't want an API-only app
    config.api_only = false
  end
end
