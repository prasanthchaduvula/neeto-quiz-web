# frozen_string_literal: true

class Exam::Mocktest < ApplicationRecord
  self.table_name = 'exam_mocktests'

  default_scope { order(created_at: :asc) }

  belongs_to :user

  validates :name, :user, presence: true
  validates :invitation_code, presence: true, uniqueness: true

  before_validation :set_invitation_code, on: :create

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