# frozen_string_literal: true

class Api::V1::Exam::ExploreController < Api::V1::BaseController
  before_action :load_mocktest, only: [:update]
  before_action :ensure_mocktest_admin, only: [:update]
  before_action :ensure_mocktest_is_published, only: [:update]

  def index
    @mocktests = Exam::Mocktest.where(is_published: true, is_explored: true)
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

    def ensure_mocktest_admin
      if current_user != @mocktest.user
        render json: { error: "You are not the creator of mocktest" }, status: :bad_request
      end
    end
end