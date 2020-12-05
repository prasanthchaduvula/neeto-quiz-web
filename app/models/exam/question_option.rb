# frozen_string_literal: true

class Exam::QuestionOption < ApplicationRecord
  self.table_name = 'exam_question_options'

  default_scope { order(created_at: :asc) }

  belongs_to :question, class_name: "Exam::Question"

  validates :name, presence: true,
                   length: { minimum: 3, maximum: 25 },
                   uniqueness: { scope: :question_id,  message: "should be unique" }
end