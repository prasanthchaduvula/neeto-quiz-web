# frozen_string_literal: true

class AddStudentService
  attr_reader :current_user, :user

  def initialize(current_user, course, user)
    @current_user = current_user
    @course = course
    @user = user
  end

  def add_student
    @course.course_students.create!(user: @user)
    send_welcome_msg
    render json: { notice: "Added student to course successfully", course: @course, joined_students: @course.joined_students }, status: :ok
  end

  def already_course_student
    render json: { notice: "This student is already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
  end

  def send_invitation
    message = "Welcome to NitoAcademy, to join #{@course.name} course, use join code #{@course.id} or click on the invitation link http://localhost:3000/api/v1/courses/#{@course.id}/course_students"

    Msg91MessageService.new.send_sms(params[:phone_number], message)
    render json: { notice: "Invitation send successfully" }
  end

  def send_welcome_msg
    message = "Welcome to NitoAcademy, you have joined #{@course.name} successfully"

    Msg91MessageService.new.send_sms(params[:phone_number], message)
  end
end