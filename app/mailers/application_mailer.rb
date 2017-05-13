class ApplicationMailer < ActionMailer::Base
  default from: ENV['DEFAULT_EMAIL_FROM']
  layout 'mailer'
end
