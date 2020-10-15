# frozen_string_literal: true

class Chapter < ApplicationRecord
  belongs_to :course
  validates :name, :course_id, presence: true
end
