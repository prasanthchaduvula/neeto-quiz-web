# frozen_string_literal: true

class Course < ApplicationRecord
  default_scope { order(created_at: :asc) }

  has_many :chapters, dependent: :destroy
  has_many :lessons, through: :chapters
  has_many :course_students, dependent: :destroy
  has_many :joined_students, through: :course_students,  source: :user

  has_many :orders

  belongs_to :user

  validates :name, :description, :user, presence: true
  validates :invitation_code, presence: true, uniqueness: true

  before_validation :set_invitation_code, on: :create

  def unpublishable?
    published && joined_students.present?
  end

  def is_publishable?
    published_lessons_count > 0 ? true : false
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

    def published_lessons_count
      lesson_count = 0
      self.chapter_ids.map do |chapter_id|
        published_lessons =  Lesson.where(chapter_id: chapter_id, is_published: true)
        lesson_count = lesson_count + published_lessons.count
      end
      lesson_count
    end
end
