# frozen_string_literal: true

class Api::V1::ChaptersController < Api::V1::BaseController
  before_action :load_course
  before_action :ensure_can_manage_course
  before_action :load_chapter, except: [:create]

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

    def load_course
      @course = Course.find_by!(id: params[:course_id])
    end

    def load_chapter
      @chapter = Chapter.find_by!(id: params[:id])
    end

    def load_chapter_json
      ChapterViewService.new(@chapter).chapter_view
    end

    def ensure_can_manage_course
      unless current_user.can_manage_course?(@course)
        render json: { error: "Should be the admin or instructor of the organization" }, status: :unprocessable_entity
      end
    end
end
