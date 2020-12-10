# frozen_string_literal: true

class AddCourseStudentService
  def initialize(course, user, phone_number)
    @course = course
    @user = user
    @phone_number = phone_number
    @message = "Welcome to NeetoAcademy"
    @welcome_msg = "you have joined #{@course.name} successfully"
    @invitation_msg = "to join #{@course.name} course, use join code #{@course.invitation_code}"
  end

  def add_student
    @course.course_students.create!(user: @user)
    send_welcome_msg
  end

  def send_invitation
    Msg91MessageService.new.send_sms(@phone_number, "#{@message}, #{@invitation_msg}")
  end

  def send_welcome_msg
    Msg91MessageService.new.send_sms(@phone_number, "#{@message}, #{@welcome_msg}")
  end
end