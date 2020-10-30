# frozen_string_literal: true

if Rails.env.heroku?
  require 'sidekiq/testing'
  Sidekiq::Testing.inline!
else
  Sidekiq.configure_server { |c| c.redis = { url: ENV['REDIS_URL'] } }
  Sidekiq.configure_client { |c| c.redis = { url: ENV['REDIS_URL'] } }
end
