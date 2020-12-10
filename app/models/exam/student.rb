# frozen_string_literal: true

class Exam::Student < ApplicationRecord
  self.table_name = 'exam_students'

  belongs_to :user
  belongs_to :mocktest, class_name: "Exam::Mocktest"
end