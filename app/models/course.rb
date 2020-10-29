# frozen_string_literal: true

class Course < ApplicationRecord
  default_scope { order(created_at: :asc) }

  has_many :chapters, dependent: :destroy
  has_many :course_students, dependent: :destroy
  has_many :joined_students, through: :course_students,  source: :user

  belongs_to :user

  validates :name, :description, :user, presence: true
end
