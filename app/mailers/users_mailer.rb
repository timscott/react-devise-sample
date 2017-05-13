class UsersMailer < Devise::Mailer
  helper :users_mailer # gives access to all helpers defined within `mailer_helper`.
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
end