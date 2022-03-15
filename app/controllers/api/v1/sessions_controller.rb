class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  def respond_with(resource, _opts = {})
    if resource.errors.any?
      render json: { errors: resource.errors }
    else
      render json: resource
    end
  end

end
