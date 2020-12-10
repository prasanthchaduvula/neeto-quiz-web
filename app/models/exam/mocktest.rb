# frozen_string_literal: true

class Exam::Mocktest < ApplicationRecord
  self.table_name = 'exam_mocktests'

  default_scope { order(created_at: :asc) }

  has_many :questions, class_name: "Exam::Question", dependent: :destroy
  has_many :exam_students, class_name: "Exam::Student", dependent: :destroy
  has_many :students, through: :exam_students, source: :user

  belongs_to :user

  validates :name, :user, presence: true
  validates :invitation_code, presence: true, uniqueness: true

  before_validation :set_invitation_code, on: :create


  def unpublishable?
    is_published && students.present?
  end

  def is_publishable?
    self.questions.present?
 end

  private

    def set_invitation_code
      self.invitation_code = generate_invitation_code
    end

    def generate_invitation_code
      loop do
        token = SecureRandom.alphanumeric(4)
        break token unless Course.where(invitation_code: token).exists?
      end
    end
end