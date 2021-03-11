# frozen_string_literal: true

class Api::V1::Exam::QuestionsController < Api::V1::BaseController
  before_action :load_mocktest
  before_action :ensure_can_manage_mocktest
  before_action :load_question, only: [:update, :destroy, :show]
  rescue_from ActiveRecord::RecordNotUnique, with: :record_already_exists

  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    @question = @mocktest.questions.create!(question_params)
    render json: { notice: "Question created successfully", question: @question, options: @question.options }, status: :ok
  end

  def update
    @question.update!(question_params)
    render json: { notice: "Question updated successfully", question: @question, options: @question.options }, status: :ok
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def destroy
    @question.destroy!
    render json: { notice: "Question deleted successfully", question: @question, options: @question.options }, status: :ok
  end

  private

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:mocktest_id])
    end

    def question_params
      params.require(:question).permit(:description, options_attributes: [:id, :name, :is_correct])
    end

    def load_question
      @question = @mocktest.questions.find_by!(id: params[:id])
    end

    def ensure_can_manage_mocktest
      unless current_user.can_manage_mocktest?(@mocktest)
        render json: { error: "Should be the admin or instructor of the mocktest" }, status: :unprocessable_entity
      end
    end

    def record_already_exists
      render json: { error: "Same option already exists" }, status: :unprocessable_entity
    end
end