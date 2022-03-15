Hello World
Hello World is a web application that provides the functionality to signup, signin, forgot password and maintains the users search hostory. Twitch API has been integrated inside the application where user can search the display names of channels

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Installing
Ruby version 3.0.0
rvm install 3.0.0
Database postgresql
brew install postgres
Clone the repository
git clone https://github.com/de-ahsan/hello_world.git
cd hello_world

Install Gems
bundle install
Rails version v6.1.5

FrontEnd Packages:
  Yup
  Formik
  Redux
  React

Install React packages using Yarn simply run
  yarn install

Database creation
  rails db:create
  rails db:migrate

Setup the API:
used figaro gem
run `bundle exec figaro:install`
open `application.yml` and setup the following keys
1.  TWITCHER_CLIENT_ID: Use the client id here
2.  TWITCHER_CLIENT_SECRET: Use the Client Secret Key here
3.  API_URL: https://id.twitch.tv/
4.  API_BASE_URL: https://api.twitch.tv/

How to run the test suite
rails test
Gems and plugins
Used rspec along with shoulda matchers gem for test coverage

run the `rails server` on terminal
run the webpacker in new terminal tab ./bin/webpack-dev-server

