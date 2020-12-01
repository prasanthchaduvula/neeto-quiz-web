# frozen_string_literal: true

class Api::V1::Exam::MocktestsController < Api::V1::BaseController
  before_action :load_mocktest, only: [:show, :update, :destroy]
  before_action :ensure_mocktest_admin, only: [:update, :destroy]
  before_action :ensure_payment_details, only: :update
  before_action :check_published_mocktest, only: :destroy


  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    @mocktest = current_user.mocktests.create!(mocktest_params)
    render json: { notice: "Mocktest created successfully", mocktest: @mocktest }, status: :ok
  end

  def update
    @mocktest.update!(mocktest_params)
    render json: { notice: "Mocktest updated successfully", mocktest: @mocktest }, status: :ok
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def destroy
    @mocktest.destroy!
    render json: { notice: "Mocktest deleted successfully", mocktest: @mocktest }, status: :ok
  end

  private

    def mocktest_params
      params.require(:mocktest).permit(:name, :is_published, :price)
    end


    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:id])
    end

    def ensure_mocktest_admin
      if current_user != @mocktest.user
        render json: { error: "You are not the creator of mocktest" }, status: :bad_request
      end
    end

    def update_price_request?
      params[:mocktest][:price] &&  params[:mocktest][:price] > 0
    end


    def ensure_payment_details
      if update_price_request?
        if current_user.payment_details.nil?
          render json: { error: "Please add payment details to update mocktest price" }, status: :unprocessable_entity
        end
      end
    end

    def check_published_mocktest
      if @mocktest.is_published
        render json: { error: "You cannot delete a published mocktest" }, status: :unprocessable_entity
      end
    end
end