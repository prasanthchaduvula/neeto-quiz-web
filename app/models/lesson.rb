# frozen_string_literal: true

class Lesson < ApplicationRecord
  enum lesson_type: { youtube: 0, pdf: 1 }

  belongs_to :chapter

  validates :name, :content, :lesson_type, presence: true
end
