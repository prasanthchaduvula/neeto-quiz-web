# frozen_string_literal: true

class Chapter < ApplicationRecord
  default_scope { order(created_at: :asc) }

  belongs_to :course

  has_many :lessons, dependent: :destroy

  validates :course_id, presence: true
  validates :name, presence: true, uniqueness: { scope: :course_id }
end
