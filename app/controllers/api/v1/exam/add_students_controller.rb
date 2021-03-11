# frozen_string_literal: true

class Api::V1::Exam::AddStudentsController < Api::V1::BaseController
  before_action :load_mocktest, only: :create
  before_action :ensure_can_manage_mocktest, only: :create
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

    def ensure_can_manage_mocktest
      unless current_user.can_manage_mocktest?(@mocktest)
        render json: { error: "Should be the admin or instructor of the organization" }, status: :unprocessable_entity
      end
    end

    def ensure_not_mocktest_student
      if current_user == @user || @user.instructor? || @mocktest.student?(@user.id)
        already_mocktest_student
      end
    end

    def ensure_mocktest_published
      unless @mocktest.is_published
        render json: { error: "You cannot add students without publishing mocktest" }, status: :unprocessable_entity
      end
    end

    def create_user
      @user = User.create!(phone_number: params[:phone_number], organization_id: current_user.organization_id, role: "student")
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