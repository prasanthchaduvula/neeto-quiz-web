# frozen_string_literal: true

class Api::V1::PublishController < Api::V1::BaseController
  before_action :find_course
  before_action :ensure_course_is_unpublishable, only: [:update]

  def update
    if @course.update(course_params)
      render status: :ok, json: { notice: "Course updated successfully", course: @course, chapters: @course.chapters, joined_students: @course.joined_students }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  private
    def course_params
      params.require(:course).permit(:published)
    end

    def ensure_course_is_unpublishable
      if @course.unpublishable?
        if publish_request?
          render status: :unprocessable_entity, json: { errors: ["You cannot unpublish course"] }
        end
      end
    end

    def publish_request?
      params[:course][:published]
    end
end