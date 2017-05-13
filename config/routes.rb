Rails.application.routes.draw do

  devise_for :users, path: :auth

  match :graphql, to: 'graphql#index', via: [:get, :post, :options]

  # NOTE: Send all routes to the main single page. This allows the client router to handle routing. This enables pretty client side URLs instead of hash URLs.
  get '/*path' => 'home#index'
end
