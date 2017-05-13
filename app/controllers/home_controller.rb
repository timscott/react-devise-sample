class HomeController < ApplicationController
  def index
    render file: 'public/index.html', layout: false
  end
end