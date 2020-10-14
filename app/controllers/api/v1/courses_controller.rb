# frozen_string_literal: true

class Api::V1::CoursesController < Api::V1::BaseController
  before_action :find_course, only: [:show, :destroy, :update]

  def create
    course = Course.new(course_params)
    if course.save
      render status: :ok, json: { notice: "Course created succesfully", course: course }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  def update
    if @course.update(course_params)
      render status: :ok, json: { notice: "Course updated successfully", course: @course }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  def show
    if @course
      render status: :ok, json: @course
    else
      render status: :not_found, json: { errors: ["Course with id #{params[:id]} not found"] }
    end
  end

  def destroy
    unless @course.published
      if @course.destroy
        render status: :ok, json: @course
      else
        render status: :unprocessable_entity, json: { errors: @course.errors.full_messages }
      end
    end
    render status: :unprocessable_entity, json: { errors: ["You cannot delete a published course"] }
  end

  private
    def course_params
      params.require(:course).permit(:name, :description, :published, :price)
    end

    def find_course
      @course = Course.find_by_id(params[:id])
    end
end