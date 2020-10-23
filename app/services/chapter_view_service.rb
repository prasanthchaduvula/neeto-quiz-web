# frozen_string_literal: true

class ChapterViewService
  def initialize(chapter)
    @chapter = chapter
  end

  def chapter_view
    {
      "chapter" => @chapter,
      "lessons" =>@chapter.lessons
    }
  end
end