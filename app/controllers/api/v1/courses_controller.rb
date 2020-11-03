# frozen_string_literal: true

class Api::V1::CoursesController < Api::V1::BaseController
  before_action :find_course, only: [:show, :destroy, :update]
  before_action :ensure_course_published, only: [:update]
  before_action :check_published_course, only: :destroy

  def index
    courses_created = current_user.courses
    courses_joined = current_user.joined_courses
    render status: :ok, json: { courses_created: courses_created, courses_joined: courses_joined }
  end

  def create
    course = current_user.courses.new(course_params)
    if course.save
      render status: :ok, json: { notice: "Course created succesfully", course: course }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  def update
    if @course.update(course_params)
      render status: :ok, json: { notice: "Course updated successfully", course: @course, chapters: @course.chapters, joined_students: @course.joined_students }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def destroy
    if @course.destroy
      render status: :ok, json: @course
    else
      render status: :unprocessable_entity, json: { errors: @course.errors.full_messages }
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

    def ensure_course_published
      if @course.published && @course.joined_students.present?
        unless params[:course][:published]
          render status: :unprocessable_entity, json: { errors: ["You cannot unpublish course"] }
        end
      end
    end
end