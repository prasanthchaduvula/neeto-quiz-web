# frozen_string_literal: true

class Exam::Attempt < ApplicationRecord
  self.table_name = 'exam_attempts'

  default_scope { order(created_at: :asc) }

  has_many :attempt_answers, class_name: "Exam::AttemptAnswer", dependent: :destroy

  belongs_to :user
  belongs_to :mocktest, class_name: "Exam::Mocktest"

  accepts_nested_attributes_for :attempt_answers, allow_destroy: true

  def selected_option(question_id, option_id)
    self.attempt_answers.find_by(question_id: question_id, option_id: option_id)
  end

  def correct_answer(question_id)
    attempted_question = self.attempt_answers.find_by(question_id: question_id)
    if attempted_question.present?
      Exam::QuestionOption.exists?(id: attempted_question.option_id, is_correct: true)
    end
  end

  def correct_answers_count
    correct_answers_count = 0
    self.attempt_answers.map do |attempt_answer|
      if Exam::QuestionOption.exists?(id: attempt_answer.option_id, is_correct: true)
        correct_answers_count = correct_answers_count + 1
      end
    end
    correct_answers_count
  end

  def unattempted_questions_count
    self.mocktest.questions.size - self.attempt_answers.size
  end

  def incorrect_answers_count
    self.mocktest.questions.size - self.unattempted_questions_count - self.correct_answers_count
  end

  def percentile
    self.correct_answers_count.to_f / self.mocktest.questions.size.to_f * 100.0
  end
end