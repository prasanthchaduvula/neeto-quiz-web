# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
   
  devise_for :users, only: []
  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      namespace :server do
        resources :organizations, only: [:create, :update], param: :subdomain
      end

      resources :login, only: [], param: :subdomain do
        member do
          post :sendotp
          post :verifyotp
        end
      end

      resources :organizations, only: [], param: :subdomain do
        resource :instructors, only:  [:show] do
          member do
            post :add
          end
        end

        resources :students, except: [:new, :edit]
      end
      
      resource :registrations, only: [:create, :update]

      resources :users, only: [:show, :update, :destroy], constraints: { id: /.*/ } 

      resources :courses, only: [:create, :update, :show, :destroy, :index] do
        member do
          get :preview
          put :publish
          put :unpublish
        end
        resources :chapters, only: [:create, :update, :show, :destroy]
        resources :add_students, only: [:create]
        resources :join_courses, only: [:create]
      end

      resources :chapters, except: [:new, :edit] do
        resources :lessons, except: [:new, :edit]
      end
      
      resources :orders, only: [:index, :create, :show, :update]

      resource :payment_details, only: [:create, :show]

      resources :join_courses, only: [:show], param: :invitation_code

      resources :explore_courses, only: [:index, :update]

      namespace :exam do
        resources :mocktests, except: [:new, :edit] do
          member do
            put :publish
            put :unpublish
            put :allow_reattempts
            put :dont_allow_reattempts
          end
          resources :join, only: [:create]
          resources :questions, except: [:new, :edit]
          resources :add_students, only: [:create]
          resources :attempts, only: [:create, :index, :show]
        end

        resources :join, only: [:show], param: :invitation_code
        resources :explore, only: [:index, :update]
      end
    end
  end

  namespace :webhooks, defaults: { format: :json } do
    namespace :razorpay do
      post '/verify', to: 'payment#verify'
    end
  end

  root "home#index"
  get "*path", to: "home#index", constraints: -> (request) do
    request.path.exclude?("/rails") 
  end
end
