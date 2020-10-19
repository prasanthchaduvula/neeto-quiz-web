# frozen_string_literal: true

class CourseStudent < ApplicationRecord
  belongs_to :user
  belongs_to :course
end