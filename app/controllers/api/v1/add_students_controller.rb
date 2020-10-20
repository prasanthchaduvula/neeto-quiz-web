# frozen_string_literal: true

class Api::V1::AddStudentsController < Api::V1::BaseController
  before_action :find_course, only: :create
  before_action :ensure_course_admin, only: :create
  before_action :load_student, only: :create


  def create
    if @user.nil? || params[:paid] == false
      send_invitation
    elsif ensure_not_course_student
      add_student
    else
      already_course_student
    end
  end

  private

    def load_student
      @user = User.find_by(phone_number: params[:phone_number])
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { notice: "You are not the creator of course" }
      end
    end

    def ensure_not_course_student
      current_user != @user && @course.joined_student_ids.exclude?(@user.id)
    end

    def add_student
      AddStudentService.new(current_user, @course, @user).add_student
      # send_welcome_msg
      # render json: { notice: "Added student to course successfully", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def already_course_student
      render json: { notice: "This student is already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def send_invitation
      # message = "Welcome to NitoAcademy, to join #{@course.name} course, use join code #{@course.id} or click on the invitation link http://localhost:3000/api/v1/courses/#{@course.id}/course_students"

      # Msg91MessageService.new.send_sms(params[:phone_number], message)
      # render json: { notice: "Invitation send successfully" }
      AddStudentService.new(current_user, @course, @user).add_student
    end

    def send_welcome_msg
      message = "Welcome to NitoAcademy, you have joined #{@course.name} successfully"

      Msg91MessageService.new.send_sms(params[:phone_number], message)
    end
end