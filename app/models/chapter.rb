# frozen_string_literal: true

class Chapter < ApplicationRecord
  belongs_to :course

  has_many :lessons, dependent: :destroy

  validates :name, :course_id, presence: true
end
