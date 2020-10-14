# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ } 
      post "/register", to: "users#send_otp"
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end