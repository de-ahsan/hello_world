Rails.application.routes.draw do

  root to: 'pages#index'

  namespace :api, as: nil do
    namespace :v1, as: nil do
      devise_for :users,
        defaults: { format: :json },
        controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations',
          passwords: 'api/v1/passwords',
          confirmations: 'api/v1/confirmations'
      }

      get '/search', to: 'twitches#search'
    end
  end
  get '*path' => 'pages#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
