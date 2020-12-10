# frozen_string_literal: true

class Exam::StudentService
  def initialize(mocktest, user, phone_number)
    @mocktest = mocktest
    @user = user
    @phone_number = phone_number
    @message = "Welcome to NeetoAcademy"
    @welcome_msg = "you have joined #{@mocktest.name} successfully"
    @invitation_msg = "to join #{@mocktest.name} mocktest, use join code #{@mocktest.invitation_code}"
  end

  def add_student
    @mocktest.exam_students.create!(user: @user)
    send_welcome_msg
  end

  def send_invitation
    Msg91MessageService.new.send_sms(@phone_number, "#{@message}, #{@invitation_msg}")
  end

  def send_welcome_msg
    Msg91MessageService.new.send_sms(@phone_number, "#{@message}, #{@welcome_msg}")
  end
end