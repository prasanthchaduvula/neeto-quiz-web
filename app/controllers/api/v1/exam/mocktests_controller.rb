# frozen_string_literal: true

class Api::V1::Exam::MocktestsController < Api::V1::BaseController
  before_action :load_mocktest, except: [:index, :create]
  before_action :ensure_mocktest_admin, except: [:index, :create, :show]
  before_action :ensure_payment_details_to_update_price, only: :update
  before_action :check_published_mocktest, only: :destroy
  before_action :ensure_payment_details_to_publish, only: :publish
  before_action :ensure_publishable, only: :publish
  before_action :ensure_mocktest_is_unpublishable, only: :unpublish

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

  def publish
    @mocktest.update!(is_published: true)
    render json: { notice: "Mocktest published successfully", course: @mocktest }, status: :ok
  end

  def unpublish
    @mocktest.update!(is_published: false)
    render json: { notice: "Mocktest unpublished successfully", course: @mocktest }, status: :ok
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

    def ensure_payment_details_to_update_price
      if update_price_request? && current_user.payment_details.nil?
        render json: { error: "Please add payment details to update mocktest price" }, status: :unprocessable_entity
      end
    end

    def check_published_mocktest
      if @mocktest.is_published
        render json: { error: "You cannot delete a published mocktest" }, status: :unprocessable_entity
      end
    end

    def ensure_publishable
      unless @mocktest.is_publishable?
        render json: { error: "Make sure at least one question is present in the mocktest" }, status: :unprocessable_entity
      end
    end

    def ensure_mocktest_is_unpublishable
      if @mocktest.unpublishable?
        render json: { error: "You cannot unpublish mocktest as you have students" }, status: :unprocessable_entity
      end
    end

    def ensure_payment_details_to_publish
      if @mocktest.price? && current_user.payment_details.nil?
        render json: { error: "Mocktest has a price. So please add payment details to publish the mocktest" }, status: :unprocessable_entity
      end
    end
end