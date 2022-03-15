# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include Api::V1::RenderHelper
  include ExceptionHandler

  protect_from_forgery unless: -> { request.format.json? }

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in) do |user|
      user.permit(
        :email,
        :password,
        :registration_token)
    end

    devise_parameter_sanitizer.permit(:sign_up) do |user|
      user.permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation)
    end
  end
end
