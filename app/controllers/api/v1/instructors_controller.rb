# frozen_string_literal: true

class Api::V1::InstructorsController < Api::V1::BaseController
  before_action :load_instructor
  before_action :load_instructor_courses

  def show
    respond_to do |format|
      format.json
    end
  end

  private
    def load_instructor
      @instructor = User.find_by!(id: params[:id])
    end

    def load_instructor_courses
      @instructor_courses =  Course.where(user_id: @instructor.id, published: true)
    end
end