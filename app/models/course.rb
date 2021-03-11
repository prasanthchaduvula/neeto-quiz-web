# frozen_string_literal: true

class Course < ApplicationRecord
  default_scope { order(created_at: :asc) }

  has_many :chapters, dependent: :destroy
  has_many :lessons, through: :chapters
  has_many :course_students, dependent: :destroy
  has_many :students, through: :course_students,  source: :user

  has_many :orders

  belongs_to :user

  validates :name, :description, :user, presence: true
  validates :invitation_code, presence: true, uniqueness: true

  before_validation :set_invitation_code, on: :create

  def unpublishable?
    published && students.present?
  end

  def is_publishable?
    self.lessons.published.count > 0 ? true : false
  end

  def published_chapters
    find_published_chapters.uniq
  end

  def chapters_with_lessons
    find_chapters_with_lessons.uniq
  end

  def student?(id)
    self.student_ids.include?(id)
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


    def find_published_chapters
      chapters.joins(:lessons).where("lessons.is_published = ?", true)
    end


    def find_chapters_with_lessons
      chapters.joins(:lessons)
    end
end
