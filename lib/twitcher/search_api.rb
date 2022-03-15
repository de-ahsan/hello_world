module Twitcher
  class SearchApi < Base
    def initialize(search_endpoint = 'helix/search/channels')
      @search_url = set_url(search_endpoint, ENV['API_BASE_URL'])
    end

    def search_query(data_element)
      @search_url = @search_url + '?query=' + data_element
      HTTParty.get(@search_url, headers: headers)
    end

    private

    def headers
      {
        'Client-id': ENV['TWITCHER_CLIENT_ID'],
        'Authorization': 'Bearer gd7ks40ra2qkdf96eppvirlkri7aje'
      }
    end
  end
end
