# frozen_string_literal: true

class Api::V1::ChaptersController < Api::V1::BaseController
  before_action :find_course, only: [:show, :destroy, :update]

  def create
    chapter = @course.chapters.new(chapter_params)
    if chapter.save
      render status: :ok, json: { notice: "chapter created succesfully", chapter: chapter }
    else
      render status: :unprocessable_entity, json: { errors: chapter.errors.full_messages }
    end
  end

  private
    def chapter_params
      params.require(:chapter).permit(:name)
    end
end