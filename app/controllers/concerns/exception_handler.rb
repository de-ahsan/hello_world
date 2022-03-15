# frozen_string_literal: true

module ExceptionHandler
  extend ActiveSupport::Concern

  included do

    rescue_from ActiveRecord::RecordNotFound do |exception|
      render_error(nil, message: 'Record not found', status: :not_found)
    end

    rescue_from ActiveRecord::RecordNotUnique do |exception|
      render_error(nil, message: "Cannot add twice", status: :not_found)
    end

    rescue_from ActionController::ParameterMissing do |exception|
      render_error(nil, message: exception.message || 'Parameter missing')
    end

  end
end
