# frozen_string_literal: true

class Api::V1::PaymentDetailsController < Api::V1::BaseController
  attr_accessor :payment_details

  before_action :ensure_organization
  before_action :ensure_admin
  before_action :load_payment_details, only: :show


  def create
    payment_details_service = PaymentDetailsService.new(@organization, payment_details_params)
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
    render json: { payment_details: payment_details }, status: :ok
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

    def ensure_organization
      unless @organization
        render json: { error: "No organization exist with this subdomain" }, status: :unprocessable_entity
      end
    end

    def ensure_admin
      if current_user.organization_id != @organization.id || !current_user.admin?
        render json: { error: "You are not the admin of this organization" }, status: :unprocessable_entity
      end
    end

    def load_payment_details
      @payment_details = @organization.payment_details
    end
end
