# frozen_string_literal: true

class Lesson < ApplicationRecord
  VALID_FILE_TYPE = %w[image/jpeg image/jpg image/gif image/png application/pdf]

  enum lesson_type: { youtube: 0, pdf: 1, image: 2 }

  belongs_to :chapter

  has_one_attached :file

  validates :name, :lesson_type, presence: true
  validates :content, presence: true, if: -> { lesson_type == "youtube" }
  validates :file, content_type: { in: VALID_FILE_TYPE, message: "must be a valid image or pdf format" },
      presence: true, if: -> { lesson_type == "image" || lesson_type == "pdf" }
end
