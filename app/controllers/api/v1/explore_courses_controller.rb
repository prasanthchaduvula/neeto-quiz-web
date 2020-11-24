# frozen_string_literal: true

class Api::V1::ExploreCoursesController < Api::V1::BaseController
  def index
    @courses = Course.where(published: true)
    respond_to do |format|
      format.json
    end
  end
end