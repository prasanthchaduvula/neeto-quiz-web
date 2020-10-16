# frozen_string_literal: true

class Lesson < ApplicationRecord
  belongs_to :chapters

  validates :name, :description, :content, :content_type, presence: true
end
