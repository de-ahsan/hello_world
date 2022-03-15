class Api::V1::TwitchesController < Api::V1::BaseController

  after_action :log_search_data, only: :search

  def search
    twitch = Twitcher::SearchApi.new
    data_element = query_params.to_hash.has_key?('query') ? query_params.to_hash['query'] : get_random_search
    data = twitch.search_query(data_element)

    render json: data.parsed_response['data'].map{|row| row['game_name']}, status: 200
  end

  private

  def query_params
    params.permit(:query, :random_search)
  end

  def log_search_data
    current_user.search_logs.create(query_data: query_params['query'])
  end

  def get_random_search
     current_user.search_logs.pluck(:query_data).sample
  end
end
