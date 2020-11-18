# frozen_string_literal: true

class Api::V1::CoursesController < Api::V1::BaseController
  before_action :find_course, only: [:show, :destroy, :update]
  before_action :ensure_course_admin, only: [:update, :destroy]
  before_action :ensure_payment_details, only: [:update]
  before_action :check_published_course, only: :destroy

  def index
    courses_created = current_user.courses
    courses_joined = current_user.joined_courses
    my_courses = current_user.my_courses
    render json: { my_courses: my_courses, courses_created: courses_created, courses_joined: courses_joined }, status: :ok
  end

  def create
    course = current_user.courses.new(course_params)
    if course.save
      render json: { notice: "Course created succesfully", course: course }, status: :ok
    else
      render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params)
      render json: { notice: "Course updated successfully", course: @course, chapters: @course.chapters, joined_students: @course.joined_students }, status: :ok
    else
      render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def destroy
    if @course.destroy
      render json: @course, status: :ok
    else
      render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def course_params
      params.require(:course).permit(:name, :description, :published, :price)
    end

    def check_published_course
      if @course.published
        render status: :unprocessable_entity, json: { errors: ["You cannot delete a published course"] }
      end
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { notice: "You are not the creator of course" }, status: :unprocessable_entity
      end
    end

    def ensure_payment_details
      if params[:course][:price] > 0
        if current_user.payment_details.nil?
          render status: :unprocessable_entity, json: { errors: ["Course has a price. So please add Bank account details to publish the course"] }
        end
      end
    end
end