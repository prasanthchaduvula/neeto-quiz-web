# frozen_string_literal: true

class Api::V1::Exam::PublishesController < Api::V1::BaseController
  before_action :load_mocktest, only: :update
  before_action :ensure_mocktest_admin, only: :update
  before_action :ensure_payment_details, only: :update
  before_action :ensure_mocktest_is_unpublishable, only: :update
  before_action :ensure_publishable, only: :update


  def update
    @mocktest.update!(mocktest_params)
    render json: { notice: "Mocktest updated successfully", mocktest: @mocktest }, status: :ok
  end

  private

    def mocktest_params
      params.require(:mocktest).permit(:is_published)
    end

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:mocktest_id])
    end

    def publish_request?
      params[:mocktest][:is_published]
    end

    def ensure_mocktest_admin
      if current_user != @mocktest.user
        render json: { error: "You are not the creator of mocktest" }, status: :bad_request
      end
    end

    def ensure_payment_details
      if @mocktest.price? && publish_request?
        if current_user.payment_details.nil?
          render json: { error: "mocktest has a price. So please add Bank account details to publish the mocktest" }, status: :unprocessable_entity
        end
      end
    end

    def ensure_mocktest_is_unpublishable
      if @mocktest.unpublishable?
        render json: { error: "You cannot publish or unpublish mocktest as you have students" }, status: :unprocessable_entity
      end
    end

    def ensure_publishable
      if publish_request?
        unless @mocktest.is_publishable?
          render json: { error: "Make sure at least one question is present in the mocktest" }, status: :unprocessable_entity
        end
      end
    end
end