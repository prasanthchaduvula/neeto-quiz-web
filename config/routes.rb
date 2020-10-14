# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  devise_for :users, only: []
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resource :registrations, only: [:new, :create] 
      resources :users, only: [:show, :update, :destroy], constraints: { id: /.*/ } 
      resources :courses, only: [:create, :update, :show, :destroy]
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end