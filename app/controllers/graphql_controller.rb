class GraphqlController < ApiController
  rescue_from Errors::Unauthorized do |exception|
    render json: {errors: ['Unauthorized.']}, status: :unauthorized
  end

  def index
    result = Schema.execute params[:query], variables: params[:variables], context: context
    render json: result, status: result['errors'] ? 422 : 200
  end

private

  def context
    token, options = ActionController::HttpAuthentication::Token.token_and_options request
    {
      ip_address: request.remote_ip
    }
  end
end