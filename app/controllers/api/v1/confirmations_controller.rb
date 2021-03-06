class Api::V1::ConfirmationsController < ::Devise::ConfirmationsController
  respond_to :json

  def create
    super
    UserMailer.registration_confirmation(@user).deliver_later
  end
end
