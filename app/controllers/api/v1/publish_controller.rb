# frozen_string_literal: true

class Api::V1::PublishController < Api::V1::BaseController
  before_action :find_course, only: :update
  before_action :ensure_course_admin, only: :update
  before_action :ensure_course_is_unpublishable, only: :update
  before_action :ensure_payment_details, only: :update
  before_action :ensure_publishable, only: :update

  def update
    @course.update!(course_params)
    render json: { notice: "Course updated successfully", course: @course }, status: :ok
  end

  private
    def course_params
      params.require(:course).permit(:published)
    end

    def publish_request?
      params[:course][:published]
    end


    def ensure_course_admin
      if current_user != @course.user
        render json: { error: "You are not the creator of course" }, status: :bad_request
      end
    end

    def ensure_course_is_unpublishable
      if @course.unpublishable?
        render json: { error: "You cannot publish or unpublish course as you have students" }, status: :unprocessable_entity
      end
    end

    def ensure_payment_details
      if @course.price? && publish_request?
        if current_user.payment_details.nil?
          render json: { error: "Course has a price. So please add Bank account details to publish the course" }, status: :unprocessable_entity
        end
      end
    end

    def ensure_publishable
      if publish_request?
        unless @course.is_publishable?
          render json: { error: "Make sure at least one lesson is published" }, status: :unprocessable_entity
        end
      end
    end
end