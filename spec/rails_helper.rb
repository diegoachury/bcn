# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!
require 'capybara/rspec'
require 'capybara/rails'
require 'capybara/email/rspec'
require 'capybara/poltergeist'
require 'phantomjs'
#include Capybara::DSL


# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  config.include Capybara::DSL, type: :feature
  config.include PostHelpers, type: :feature
  config.include LocationHelpers, type: :feature
  config.include CommunityHelpers, type: :feature
  config.include RailsDomIdHelper, type: :feature
  config.include DatabaseCleaner, type: :feature
  config.include Requests::JsonHelpers
  config.include AuthenticationHelpers, type: :feature
  config.include UserHelpers
  config.include ActionDispatch::TestProcess, type: :feature

  config.include FactoryGirl::Syntax::Methods

  config.include ApiHelper, :type=>:api #apply to all spec for apis folder

  # Set the server port and make sure the clients can find it.
  Capybara.app_host = 'http://localhost'
  Capybara.server_port = 10000
  Capybara.always_include_port = true

  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, :phantomjs => Phantomjs.path)
  end

  # Use selenium driver (Firefox) for visual tagged tests.
  if config.filter_manager.inclusions[:visual]
    Capybara.javascript_driver = :selenium
    config.filter_manager.inclusions.delete(:visual)
  else
    Capybara.javascript_driver = :poltergeist
  end

  # Exclude :firefox tagged tests by default.
  config.filter_run_excluding :firefox => true
end
