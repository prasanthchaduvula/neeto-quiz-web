# frozen_string_literal: true

class Api::V1::LessonsController < Api::V1::BaseController
  before_action :load_chapter

  def create
    lesson = @chapter.lessons.new(lesson_params)
    if lesson.save
      render status: :ok, json: { notice: "Lesson created successfully", lesson: lesson }
    else
      render status: :unprocessable_entity, json: { errors: lesson.errors.full_messages }
    end
  end

  private

    def lesson_params
      params.request(:lesson).permit(:name, :description, :content, :content_type)
    end

    def load_chapter
      @chapter = Chapter.find_by!(id: params[:chapter_id])
    end
end