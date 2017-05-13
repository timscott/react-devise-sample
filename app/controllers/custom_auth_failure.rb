class CustomAuthFailure < Devise::FailureApp

  def respond
    self.status = :unauthorized
    self.content_type = :json
    self.response_body = {errors: ['Invalid login credentials']}.to_json
  end

end