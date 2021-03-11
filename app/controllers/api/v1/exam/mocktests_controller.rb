# frozen_string_literal: true

class Api::V1::Exam::MocktestsController < Api::V1::BaseController
  before_action :ensure_can_create_mocktest, only: [:create]
  before_action :load_mocktest, except: [:index, :create]
  before_action :ensure_can_manage_mocktest, except: [:index, :create, :show]
  before_action :ensure_payment_details_to_update_price, only: :update
  before_action :check_published_mocktest, only: :destroy
  before_action :ensure_payment_details_to_publish, only: :publish
  before_action :ensure_publishable, only: :publish
  before_action :ensure_mocktest_is_unpublishable, only: :unpublish
  before_action :load_recent_attempt, only: :show
  before_action :ensure_allow_mocktest_reattempts, only: :show
  before_action :render_show, only: :show

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
    render
  end

  def destroy
    @mocktest.destroy!
    render json: { notice: "Mocktest deleted successfully", mocktest: @mocktest }, status: :ok
  end

  def publish
    @mocktest.update!(is_published: true)
    render json: { notice: "Mocktest published successfully", mocktest: @mocktest }, status: :ok
  end

  def unpublish
    @mocktest.update!(is_published: false)
    render json: { notice: "Mocktest unpublished successfully", mocktest: @mocktest }, status: :ok
  end

  def allow_reattempts
    @mocktest.update!(allow_reattempts: true)
    render json: { notice: "Mocktest can reattmpted", mocktest: @mocktest }, status: :ok
  end

  def dont_allow_reattempts
    @mocktest.update!(allow_reattempts: false)
    render json: { notice: "Mocktest can not be reattmpted", mocktest: @mocktest }, status: :ok
  end

  private

    def mocktest_params
      params.require(:mocktest).permit(:name, :is_published, :price)
    end


    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:id])
    end

    def ensure_can_create_mocktest
      unless current_user.can_create?
        render json: { error: "Should be the admin or instructor of the organization to create mocktest" }, status: :unprocessable_entity
      end
    end

    def ensure_can_manage_mocktest
      unless current_user.can_manage_mocktest?(@mocktest)
        render json: { error: "Should be the admin or instructor of the organization" }, status: :unprocessable_entity
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

    def load_recent_attempt
      @attempt = Exam::Attempt.where(user_id: current_user.id, mocktest_id: @mocktest.id).last
    end

    def ensure_allow_mocktest_reattempts
      if params[:retake] == "true" && @mocktest.allow_reattempts == false
        render json: { error: "You can not reattempt this mocktest" }, status: :unprocessable_entity
      end
    end

    def render_show
      if params[:retake] == "true" && @mocktest.allow_reattempts == true
        render template: "api/v1/exam/mocktests/show"
      else
        render template: "api/v1/exam/mocktests/show"
      end
    end

    def render_attempt
      render template: "api/v1/exam/attempts/show"
    end
end