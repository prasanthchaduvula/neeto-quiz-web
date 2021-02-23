# frozen_string_literal: true

class Lesson < ApplicationRecord
  default_scope { order(created_at: :asc) }

  VALID_FILE_TYPE = %w[image/jpeg image/jpg image/gif image/png application/pdf]

  enum lesson_type: { youtube: 0, pdf: 1, image: 2 }

  belongs_to :chapter

  has_one_attached :file

  scope :published, -> { where(is_published: true) }

  validates :name, presence: true, uniqueness: { scope: :chapter_id }
  validates :lesson_type, presence: true
  validates :content, presence: true, if: -> { lesson_type == "youtube" }
  validates :file, content_type: { in: VALID_FILE_TYPE, message: "must be a valid image or pdf format" },
      presence: true, if: -> { lesson_type == "image" || lesson_type == "pdf" }

  def file_url
    return unless file.present?

    if Rails.env.production?
      file.service_url
    else
      Rails.application.routes.url_helpers.polymorphic_path(file)
    end
  end
end
