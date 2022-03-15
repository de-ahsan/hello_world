# frozen_string_literal: true

module Twitcher
  class Base
    include HTTParty

    attr_accessor :token_url

    TOKEN_QUERY_PARAMS = {
      client_id: ENV['TWITCHER_CLIENT_ID'],
      client_secret: ENV['TWITCHER_CLIENT_SECRET'],
      grant_type: 'client_credentials'
    }.freeze

    def generate_token
      self.token_url = set_url('oauth2/token')
      request = HTTParty.post(@token_url, headers: { 'Content-Type': 'application/json' },
                              body: TOKEN_QUERY_PARAMS.to_json)
      request.parsed_response['access_token']
    end

    def set_url(endpoint='', base_url=ENV['API_URL'])
      base_url + endpoint
    end

    private

    # def default_headers
    #   { 'Content-Type': 'application/json' }
    # end
  end
end
