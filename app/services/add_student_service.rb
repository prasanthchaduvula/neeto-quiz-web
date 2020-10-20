# frozen_string_literal: true

class AddStudentService
  def initialize(current_user, course, user = false, phone_number)
    @current_user = current_user
    @course = course
    @user = user
    @phone_number = phone_number
  end

  def add_student
    @course.course_students.create!(user: @user)
    send_welcome_msg
  end

  def send_invitation
    message = "Welcome to NitoAcademy, to join #{@course.name} course, use join code #{@course.id} or click on the invitation link http://localhost:3000/api/v1/courses/#{@course.id}/course_students"

    Msg91MessageService.new.send_sms(@phone_number, message)
  end

  def send_welcome_msg
    message = "Welcome to NitoAcademy, you have joined #{@course.name} successfully"

    Msg91MessageService.new.send_sms(@phone_number, message)
  end
end