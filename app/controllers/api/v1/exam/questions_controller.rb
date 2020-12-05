# frozen_string_literal: true

class Api::V1::Exam::QuestionsController < Api::V1::BaseController
  before_action :load_mocktest
  before_action :ensure_mocktest_admin
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

    def ensure_mocktest_admin
      if current_user != @mocktest.user
        render json: { error: "You are not the creator of mocktest" }, status: :bad_request
      end
    end

    def record_already_exists
      render json: { error: "Same option already exists" }, status: :unprocessable_entity
    end
end