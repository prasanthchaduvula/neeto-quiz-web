# frozen_string_literal: true

class Exam::AttemptAnswer < ApplicationRecord
  self.table_name = 'exam_attempt_answers'

  default_scope { order(created_at: :asc) }

  belongs_to :option, class_name: "Exam::QuestionOption"
  belongs_to :question, class_name: "Exam::Question"
  belongs_to :attempt, class_name: "Exam::attempt"
end