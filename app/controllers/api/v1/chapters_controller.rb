# frozen_string_literal: true

class Api::V1::ChaptersController < Api::V1::BaseController
  before_action :find_course, only: :create
  before_action :find_chapter, only: [:show, :destroy, :update]

  def create
    chapter = @course.chapters.new(chapter_params)
    if chapter.save
      render status: :ok, json: { notice: "chapter created succesfully", chapter: chapter }
    else
      render status: :unprocessable_entity, json: { errors: chapter.errors.full_messages }
    end
  end

  def update
    if @chapter.update(chapter_params)
      render status: :ok, json: { notice: "Chapter updated successfully", chapter: @chapter }
    else
      render status: :unprocessable_entity, json: { errors: @chapter.errors.full_messages }
    end
  end

  def show
    if @chapter
      render status: :ok, json: @chapter
    else
      render status: :not_found, json: { errors: ["Chapter with id #{params[:id]} not found"] }
    end
  end

  def destroy
    if @chapter.destroy
      render status: :ok, json: @chapter
    else
      render status: :unprocessable_entity, json: { errors: @chapter.errors.full_messages }
    end
  end

  private
    def chapter_params
      params.require(:chapter).permit(:name)
    end

    def find_chapter
      @chapter = Chapter.find_by_id(params[:id])
    end
end