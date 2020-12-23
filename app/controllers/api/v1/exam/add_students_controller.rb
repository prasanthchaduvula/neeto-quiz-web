# frozen_string_literal: true

class Api::V1::Exam::AddStudentsController < Api::V1::BaseController
  before_action :load_mocktest, only: :create
  before_action :ensure_mocktest_admin, only: :create
  before_action :ensure_mocktest_published, only: :create
  before_action :load_user, only: :create
  before_action :ensure_not_mocktest_student, only: :create

  def create
    if params[:is_paid] == false
      send_invitation
    else
      add_student
    end
  end

  private

    def load_mocktest
      @mocktest = Exam::Mocktest.find_by!(id: params[:mocktest_id])
    end

    def load_user
      @user = User.find_by(phone_number: params[:phone_number])
      if @user.nil?
        create_user
      end
    end

    def ensure_mocktest_admin
      if current_user != @mocktest.user
        render json: { error: "You are not the creator of mocktest" }, status: :bad_request
      end
    end

    def ensure_not_mocktest_student
      unless current_user != @user && @mocktest.student_ids.exclude?(@user.id)
        already_mocktest_student
      end
    end

    def ensure_mocktest_published
      unless @mocktest.is_published
        render status: :unprocessable_entity, json: { error: "You cannot add students without publishing mocktest" }
      end
    end

    def create_user
      @user = User.create!(phone_number: params[:phone_number])
    end

    def add_student
      Exam::StudentService.new(@mocktest, @user, params[:phone_number]).add_student!
      render json: { notice: "Added student to mocktest successfully", mocktest: @mocktest, students: @mocktest.students }, status: :ok
    end

    def send_invitation
      Exam::StudentService.new(@mocktest, @user, params[:phone_number]).send_invitation
      render json: { notice: "Invitation sent successfully" }, status: :ok
    end

    def already_mocktest_student
      render json: { notice: "This student is already a member of mocktest", mocktest: @mocktest, students: @mocktest.students }, status: :ok
    end
end