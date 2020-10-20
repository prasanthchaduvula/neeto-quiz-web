# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  devise_for :users, only: []
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resource :registrations, only: [:create, :update] 
      resources :users, only: [:show, :update, :destroy], constraints: { id: /.*/ } 
      resources :courses, only: [:create, :update, :show, :destroy] do
        resources :chapters, only: [:create, :update, :show, :destroy]
        resources :course_students, only: [:create]
        resources :add_students, only: [:create]
      end

      resources :chapters, except: [:new, :edit] do
        resources :lessons, except: [:new, :edit]
      end

      resources :chapters, except: [:new, :edit] do
        resources :lessons, except: [:new, :edit]
      end
    end
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end