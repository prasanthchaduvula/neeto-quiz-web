# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :chapters
  belongs_to :user
  validates :name, :description, :user, presence: true
end
