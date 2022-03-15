class Api::V1::RegistrationsController < ::Devise::RegistrationsController
  before_action :authenticate_user!, only: [ :update ]
  respond_to :json

  def respond_with(resource, _opts = {})
    if resource.errors.any?
      render json: { errors: resource.errors }
    else
      render json: resource
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
