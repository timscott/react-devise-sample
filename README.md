# React Devise Sample

This app is a reference implementation of [react-devise](https://github.com/timscott/react-devise).

## Demo

This app is deployed on Heroku: https://github.com/timscott/react-devise-sample

## Setup

Steps to set up after cloning the repo locally.

```bash
gem install bundler
bundle
rails db:setup
# Create .env file with devise token secret
rails secret | (read secret; echo DEVISE_JWT_SECRET_KEY="$secret" > .env)
# Install client dependencies
(cd client && yarn)
# Run the app
foreman start -f Procfile.dev
```

### A Note About Ports

The api and the website will run on different ports. The port specified in the ```.foreman``` file will be used for the api, and the website will run on that port +100. To get the website to access the api on it's own domain, we have added the following to ```./client/package.json```.


```json
"proxy": "http://localhost:[the same port in the .foreman file]"
```

If you want to change the ports locally, change the port both ```.foreman``` and ```./client/package.json``` to the same value.

