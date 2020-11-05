# frozen_string_literal: true

class Api::V1::PaymentDetailsController < Api::V1::BaseController
  attr_accessor :payment_details

  before_action :load_payment_details, only: :show

  def create
    payment_details_service = PaymentDetailsService.new(current_user, payment_details_params)
    payment_details_service.process

    if payment_details_service.errors.present?
      render status: payment_details_service.status,
      json: { errors: payment_details_service.errors }
    else
      render status: payment_details_service.status,
      json: payment_details_service.response
    end
  end

  def show
    if payment_details
      render json: { payment_details: payment_details }, status: :ok
    else
      render json: { errors: ["Payment details not found"] }, status: :not_found
    end
  end

  private

    def payment_details_params
      params.require(:payment_details).permit(
        :ifsc,
        :account_number,
        :account_type,
        :business_name,
        :email_id
      )
    end

    def load_payment_details
      @payment_details = current_user.payment_details
    end
end
