# frozen_string_literal: true

class PaymentDetailsService
  attr_reader :options, :organization, :razorpay_response, :payment_details
  attr_accessor :status, :errors, :response

  def initialize(organization = {}, options = {})
    @organization = organization
    @options = options
    @errors = []
  end

  def process
    create_service_response
  end

  private

    def create_service_response
      add_razorpay_account && add_payment_details_to_organization
    end

    def add_razorpay_account
      begin
        @razorpay_response = Razorpay::MerchantAccountService.new(account_payload).create_account
      rescue Razorpay::BadRequestError => e
        set_errors_and_status(e, :bad_request)
        false
      end
    end

    def add_payment_details_to_organization
      PaymentDetail.transaction do
        @payment_details = PaymentDetail.create!(
          razorpay_account_id: razorpay_response["id"],
          ifsc: options[:ifsc],
          account_number: options[:account_number],
          account_type: options[:account_type],
          business_name: options[:business_name],
          email_id: options[:email_id],
          organization_id: organization.id
        )

        @response = json_response
        @status = :ok

        true
      rescue ActiveRecord::RecordInvalid => invalid
        set_errors_and_status(invalid.record.errors.full_messages, :unprocessable_entity)
        false
      end
    end

    def set_errors_and_status(message, status)
      errors << message
      @status = status
    end

    def json_response
      { notice: "Payment details created successfully", payment_details: payment_details }
    end

    def account_payload
      {
        "name": organization.name,
        "email": options[:email_id],
        "tnc_accepted": true,
        "account_details": {
          "business_name": options[:business_name],
          "business_type": "individual"
        },
        "bank_account": {
          "ifsc_code": options[:ifsc],
          "beneficiary_name": organization.name,
          "account_type": options[:account_type],
          "account_number": options[:account_number]
        }
      }
    end
end