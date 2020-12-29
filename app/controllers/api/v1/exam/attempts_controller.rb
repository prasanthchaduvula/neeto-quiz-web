# frozen_string_literal: true

class Api::V1::Exam::AttemptsController < Api::V1::BaseController
  before_action :load_mocktest, only: [:create, :index, :show]
  before_action :ensure_mocktest_member, only: [:create, :index]
  before_action :ensure_not_mocktest_admin, only: :create
  before_action :ensure_mocktest_student, only: :create
  before_action :load_attempts_for_instructor, only: :index
  before_action :load_attempts_for_student, only: :index
  before_action :load_attempt, only: :show

  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    attempt = Exam::Attempt.create!(attempt_values)
    render json: { notice: "Attempted successfully", attempt: attempt }, status: :ok
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(attempt_answers_attributes: [:id, :option_id, :question_id])
    end

    def attempt_values
      {
        user_id: current_user.id,
        mocktest_id: @mocktest.id,
        attempt_answers_attributes: attempt_params[:attempt_answers_attributes]
      }
    end

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:mocktest_id])
    end

    def ensure_not_mocktest_admin
      if @mocktest.user == current_user
        render json: { notice: "You are the creator of this mocktest" }, status: :unprocessable_entity
      end
    end

    def ensure_mocktest_student
      if @mocktest.student_ids.exclude?(current_user.id)
        render json: { notice: "You are not the student of mocktest" }, status: :bad_request
      end
    end

    def check_mocktest_member
      @mocktest.user == current_user || @mocktest.student_ids.include?(current_user.id)
    end

    def ensure_mocktest_member
      unless check_mocktest_member
        render json: { error: "You are not the member of mocktest", isMember: false }, status: :bad_request
      end
    end

    def load_attempts_for_instructor
      if current_user == @mocktest.user
        @attempts = @mocktest.attempts
      end
    end

    def load_attempts_for_student
      if @mocktest.student_ids.include?(current_user.id)
        @attempts = Exam::Attempt.where(user_id: current_user.id, mocktest_id: @mocktest.id)
      end
    end

    def load_attempt
      @attempt = Exam::Attempt.find_by!(id: params[:id])
    end
end