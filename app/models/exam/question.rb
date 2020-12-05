# frozen_string_literal: true

class Exam::Question < ApplicationRecord
  self.table_name = 'exam_questions'

  default_scope { order(created_at: :asc) }

  has_many :options, class_name: "Exam::QuestionOption", dependent: :destroy

  belongs_to :mocktest, class_name: "Exam::Mocktest"

  accepts_nested_attributes_for :options, allow_destroy: true

  validates :description, presence: true
  validates_length_of :options,  is: 4,  message: "4 required"
  validate :correct_option_validation



  private

    def correct_option_validation
      correct_options_count = options.select { |option| option.is_correct? }.count

      if correct_options_count == 0
        errors.add(:options, "At least one option should be correct")
      end

      if correct_options_count > 1
        errors.add(:options, "Only one option should be correct")
      end
    end
end