# frozen_string_literal: true

class Api::V1::CoursesController < Api::V1::BaseController
  before_action :load_course, except: [:index, :create]
  before_action :ensure_course_admin, except: [:index, :create, :show, :preview]
  before_action :check_published_course, only: :destroy
  before_action :ensure_payment_details_to_update_price, only: :update
  before_action :ensure_payment_details_to_publish, only: :publish
  before_action :ensure_publishable, only: :publish
  before_action :ensure_course_is_unpublishable, only: :unpublish

  def index
    respond_to do |format|
      format.json
    end
  end

  def create
    course = current_user.courses.create!(course_params)
    render json: { notice: "Course created succesfully", course: course }, status: :ok
  end

  def update
    @course.update!(course_params)
    render json: { notice: "Course updated successfully", course: @course }, status: :ok
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def destroy
    @course.destroy!
    render json: { notice: "Course deleted successfully", course: @course }, status: :ok
  end

  def preview
    render template: "api/v1/courses/preview"
  end

  def publish
    @course.update!(published: true)
    render json: { notice: "Course published successfully", course: @course }, status: :ok
  end

  def unpublish
    @course.update!(published: false)
    render json: { notice: "Course unpublished successfully", course: @course }, status: :ok
  end

  private

    def course_params
      params.require(:course).permit(:name, :description, :published, :price)
    end

    def load_course
      @course = Course.find_by!(id: params[:id])
    end

    def check_published_course
      if @course.published
        render json: { error: "You cannot delete a published course" }, status: :unprocessable_entity
      end
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { notice: "You are not the creator of course" }, status: :unprocessable_entity
      end
    end

    def update_price_request?
      params[:course][:price] &&  params[:course][:price] > 0
    end

    def ensure_payment_details_to_update_price
      if update_price_request? && current_user.payment_details.nil?
        render json: { error: "Please add payment details to update course price" }, status: :unprocessable_entity
      end
    end

    def ensure_publishable
      unless @course.is_publishable?
        render json: { error: "Make sure at least one lesson is published" }, status: :unprocessable_entity
      end
    end

    def ensure_course_is_unpublishable
      if @course.unpublishable?
        render json: { error: "You cannot unpublish course as you have students" }, status: :unprocessable_entity
      end
    end

    def ensure_payment_details_to_publish
      if @course.price? && current_user.payment_details.nil?
        render json: { error: "Course has a price. So please add payment details to publish the course" }, status: :unprocessable_entity
      end
    end
end