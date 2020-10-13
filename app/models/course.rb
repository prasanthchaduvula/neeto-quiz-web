# frozen_string_literal: true

class Course < ApplicationRecord
  validates :name, :description, presence: true
end
