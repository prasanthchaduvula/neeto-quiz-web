# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
   
  devise_for :users, only: []
  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      resource :registrations, only: [:create, :update]

      resources :users, only: [:show, :update, :destroy], constraints: { id: /.*/ } 
    end
  end

  root "home#index"
  get "*path", to: "home#index", constraints: -> (request) do
    request.path.exclude?("/rails") 
  end
end
