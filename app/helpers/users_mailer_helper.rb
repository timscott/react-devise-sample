module UsersMailerHelper

  url_defaults = Rails.configuration.action_mailer.default_url_options
  protocol = url_defaults[:protocol] || 'http'
  port = ":#{url_defaults[:port]}" if url_defaults[:port].present?

  Devise::URL_HELPERS.each do |module_name, actions|
    actions.each do |action|
      method = ['user', action, module_name, 'url'].compact.join '_'
      path = ['users', module_name, action].compact.join '/'

      define_method method do |params = nil|
        query = "?#{params.map {|k,v| "#{k}=#{v}"}.join('&')}" if params.present?
        "#{protocol}://#{url_defaults[:host]}#{port}/#{path}#{query}"
      end
    end
  end

end