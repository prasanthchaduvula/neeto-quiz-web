# frozen_string_literal: true

class Api::V1::AddStudentsController < Api::V1::BaseController
  before_action :find_course, only: :create
  before_action :ensure_course_admin, only: :create
  before_action :ensure_course_published, only: :create
  before_action :load_user, only: :create
  before_action :ensure_not_course_student, only: :create


  def create
    if params[:is_paid] == false
      send_invitation
    else
      add_student
    end
  end

  private

    def load_user
      @user = User.find_by(phone_number: params[:phone_number])
      if @user.nil?
        create_user
      end
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { notice: "You are not the creator of course" }, status: :unprocessable_entity
      end
    end

    def ensure_not_course_student
      unless current_user != @user && @course.joined_student_ids.exclude?(@user.id)
        already_course_student
      end
    end

    def add_student
      AddStudentService.new(current_user, @course, @user, params[:phone_number]).add_student
      render json: { notice: "Added student to course successfully", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def already_course_student
      render json: { notice: "This student is already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def send_invitation
      AddStudentService.new(current_user, @course, @user, params[:phone_number]).send_invitation
      render json: { notice: "Invitation sent successfully" }, status: :ok
    end

    def create_user
      @user = User.create!(phone_number: params[:phone_number])
    end

    def ensure_course_published
      unless @course.published
        render status: :unprocessable_entity, json: { errors: ["You cannot add students without publishing course"] }
      end
    end
end