# frozen_string_literal: true

class Api::V1::Exam::ExploreController < Api::V1::BaseController
  before_action :load_mocktest, only: [:update]
  before_action :ensure_can_manage_mocktest, only: [:update]
  before_action :ensure_mocktest_is_published, only: [:update]

  def index
    @mocktests = current_user.organization.marketplace_mocktests
    respond_to do |format|
      format.json
    end
  end

  def update
    @mocktest.update!(mocktest_params)
    render json: { notice: "Mocktest Added to explore section successfully", mocktest: @mocktest }, status: :ok
  end

  private

    def mocktest_params
      params.require(:mocktest).permit(:is_explored)
    end

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:id])
    end

    def ensure_mocktest_is_published
      unless @mocktest.is_published
        render json: { error: "Make sure that mocktest is published", mocktest: @mocktest }, status: :unprocessable_entity
      end
    end

    def ensure_can_manage_mocktest
      unless current_user.can_manage_mocktest?(@mocktest)
        render json: { error: "You are not the member of organization where this mocktest belongs to" }, status: :unprocessable_entity
      end
    end
end