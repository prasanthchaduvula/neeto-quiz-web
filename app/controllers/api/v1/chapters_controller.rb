# frozen_string_literal: true

class Api::V1::ChaptersController < Api::V1::BaseController
  before_action :find_course
  before_action :ensure_course_admin, only: [:create, :update, :destroy]
  before_action :find_chapter, only: [:show, :destroy, :update]

  def create
    chapter = @course.chapters.create!(chapter_params)
    render json: { notice: "chapter created succesfully", chapter: chapter }, status: :ok
  end

  def update
    @chapter.update!(chapter_params)
    render json: { notice: "Chapter updated successfully", chapter_details: load_chapter_json }, status: :ok
  end

  def show
    render json: load_chapter_json, status: :ok
  end

  def destroy
    @chapter.destroy!
    render json: { notice: "Mocktest deleted successfully", chapter: @chapter }, status: :ok
  end

  private
    def chapter_params
      params.require(:chapter).permit(:name)
    end

    def find_chapter
      @chapter = Chapter.find_by!(id: params[:id])
    end

    def load_chapter_json
      ChapterViewService.new(@chapter).chapter_view
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { error: "You are not the creator of course" }, status: :bad_request
      end
    end
end
