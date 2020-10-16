# frozen_string_literal: true

class Lesson < ApplicationRecord
  enum content_type: { youtube: 0, pdf: 1 }

  belongs_to :chapter

  validates :name, :content, :content_type, presence: true
end
