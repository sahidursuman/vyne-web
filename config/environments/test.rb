Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # The test environment is used exclusively to run your application's
  # test suite. You never need to work with it otherwise. Remember that
  # your test database is "scratch space" for the test suite and is wiped
  # and recreated between test runs. Don't rely on the data there!
  config.cache_classes = true

  # Do not eager load code on boot. This avoids loading your whole application
  # just for the purpose of running a single test. If you are using a tool that
  # preloads Rails for running tests, you may have to set it to true.
  config.eager_load = false

  # Configure static asset server for tests with Cache-Control for performance.
  config.serve_static_assets  = true
  config.static_cache_control = 'public, max-age=3600'

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Raise exceptions instead of rendering exception templates.
  config.action_dispatch.show_exceptions = false

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Tell Action Mailer not to deliver emails to the real world.
  # The :test delivery method accumulates sent emails in the
  # ActionMailer::Base.deliveries array.
  config.action_mailer.delivery_method = :test

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Devise mailer:
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000, scheme: 'http' }
  # In production, :host should be set to the actual host of your application.

  config.log_level = :error
  # Set the logging destination(s)
  config.log_to = %w[stdout]

  # Show the logging configuration on STDOUT
  config.show_log_configuration = true

  # Mandrill API
  config.mandrill = 'ipcLBLgQRHya2q3jvpPQsw'

  # Stripe
  config.stripe_key = 'sk_test_AtBOn3YHMmRXJgn0TT9x98Y2'

  config.stripe_key_publishable = 'pk_test_2uUf7eQJy5mj038BJFUtxJfF'

  # Shutl
  config.shutl_url = 'https://sandbox-v2.shutl.co.uk'
  config.shutl_id = 'HnnFB2UbMlBXdD9h4UzKVQ=='
  config.shutl_secret = 'pKNKPPCejzviiPunGNhnJ95G1JdeAbOYbyAygqIXyfIe4lb73iIDKRqmeZmZWT+ORxTqwMP9PhscJAW7GFmz6A=='

  # Segment IO
  config.segment_io_write_key =  'gTrenJGlvC'

  # Sentry
  config.sentry_dns = 'https://8830d38a3ab24cea90a374858941d1f6:70306e5411ca4acea11091a14208176b@app.getsentry.com/32522'

  # Mailchimp
  config.mailchimp_key = '218800eead6b63a85a54db6df3eaedc4-us8'

  # Currrent Delivery Distance (Miles)
  config.max_delivery_distance = 3

  # Vyne order internal notification email
  config.order_notification = 'jakub@vyne.london'

  # Require invitation code to access the site.
  config.enable_invite_code = 'true'
  config.invite_code = 'timeforvyne'

  # Googe GCM
  config.google_gcm_public_api_key = 'AIzaSyCUuUzZOMAKS1n6kA396bI8FBUWpvdwyWk'

  # Google Coordinate Team Id
  config.google_coordinate_team_id = 'ZtCbuYnbGi9fTxkJtV390w'
  config.google_coordinate_client_id = '662241065743-4jg7eectv71j6a4na8o327kid6m37tvd.apps.googleusercontent.com'
  config.google_coordinate_client_secret = '5kdwemy_dpS1adj3TFNvAkX2'

  # Redis
  config.redis = 'redis://127.0.0.1:6379/0'

  # Twilio
  config.twilio_account_sid = 'AC1dac7ea5c33e1e694785e5f1d2dbe1c1'
  config.twilio_auth_token = 'f7a10f8654a601e49485efc152faefcf'
  config.twilio_number = '+15005550006'

end
