Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, FACEBOOK_CONFIG['app_id'], FACEBOOK_CONFIG['secret'],
           :setup => true,
           :scope => 'user_events'

  provider :twitter, TWITTER_CONFIG['app_id'], TWITTER_CONFIG['secret']
end