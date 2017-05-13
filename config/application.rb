require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ReactDeviseSample
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    config.eager_load_paths += Dir["#{config.root}/app/graph/**/**/"]
    config.eager_load_paths << Rails.root.join('lib')
    config.eager_load_paths << Rails.root.join('lib', 'errors')
    config.eager_load_paths << Rails.root.join('app', 'helpers')

    config.to_prepare do
      DeviseController.respond_to :json
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.middleware.use ActionDispatch::Flash
    config.middleware.delete ActionDispatch::Session::CookieStore
  end
end
