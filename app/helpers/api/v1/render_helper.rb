# frozen_string_literal: true

module Api
  module V1
    module RenderHelper
      def render_error(model = nil, message: nil, status: :unprocessable_entity)
        error_msg = model.try(:errors).try(:full_messages).try(:first)

        error = if error_msg.present?
                  error_msg
                elsif message.present?
                  message
                else
                  'Unknown error'
                end

        render json: { error: error }, status: status
      end

      def serialize_array(array, serializer)
        ActiveModel::Serializer::CollectionSerializer.new(
          array,
          each_serializer: serializer,
          root: false
        )
      end
    end
  end
end
