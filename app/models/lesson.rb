# frozen_string_literal: true

class Lesson < ApplicationRecord
  enum lesson_type: { youtube: 0, pdf: 1, image: 2 }

  belongs_to :chapter

  has_one_attached :file

  validates :name, :lesson_type, presence: true
end
