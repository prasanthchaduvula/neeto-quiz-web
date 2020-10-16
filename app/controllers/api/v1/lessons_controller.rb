# frozen_string_literal: true

class Api::V1::LessonsController < Api::V1::BaseController
  before_action :load_chapter
  before_action :load_lesson, except: [:create]

  def create
    @lesson = @chapter.lessons.new(lesson_params)
    if @lesson.save
      render json: { lesson: @lesson }, status: :ok
    else
      render status: :unprocessable_entity, json: { errors: @lesson.errors.full_messages }
    end
  end

  def update
    if @lesson.update(lesson_params)
      render json: { lesson: @lesson }, status: :ok
    else
      render json: { errors: @lesson.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def lesson_params
      params.require(:lesson).permit(:name, :description, :content, :content_type)
    end

    def load_lesson
      @lesson = @chapter.lessons.find_by!(id: params[:id])
    end

    def load_chapter
      @chapter = Chapter.find_by!(id: params[:chapter_id])
    end
end