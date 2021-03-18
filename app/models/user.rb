# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :rememberable
  devise :database_authenticatable, authentication_keys: [:phone_number]

  enum role: { regular_user: 0, admin: 1, instructor: 2, student: 3 }

  has_many :courses, dependent: :destroy
  has_many :course_students, dependent: :destroy
  has_many :joined_courses, through: :course_students,  source: :course
  has_many :orders, dependent: :destroy
  has_many :mocktests, class_name: "Exam::Mocktest", dependent: :destroy
  has_many :exam_students, class_name: "Exam::Student", dependent: :destroy
  has_many :joined_mocktests, through: :exam_students, source: :mocktest
  has_many :attempts, class_name: "Exam::Attempt", dependent: :destroy

  belongs_to :organization

  scope :student, -> { where(role: "student").order(created_at: :desc) }
  scope :instructor, -> { where(role: "instructor").order(created_at: :desc) }

  validates :first_name, :last_name, presence: true, on: :update
  validates :phone_number, presence: true, numericality: true, length: { is: 13 }, uniqueness: { scope: :organization_id }

  before_validation :set_organization

  before_save :ensure_authentication_token_is_present

  def email_required?
    false
  end

  def password_required?
    false
  end

  def will_save_change_to_email?
    false
  end

  def will_save_change_to_id?
    false
  end

  def name
    "#{first_name} #{last_name}"
  end

  def can_create?
    self.admin? || self.instructor?
  end

  def can_manage_course?(course)
    self.admin? || Course.exists?(id: course.id, user_id: id)
  end

  def course_member?(course)
    can_manage_course?(course) || course.student?(id)
  end

  def my_courses
    if self.admin?
      self.organization.courses
    elsif self.instructor?
      self.courses
    else
      self.joined_courses
    end
  end

  def can_manage_mocktest?(mocktest)
    self.admin? || Exam::Mocktest.exists?(id: mocktest.id, user_id: id)
  end

  def mocktest_member?(mocktest)
    can_manage_mocktest?(mocktest) || mocktest.student?(id)
  end

  def my_mocktests
    if self.admin?
      self.organization.mocktests
    elsif self.instructor?
      self.mocktests
    else
      self.joined_mocktests
    end
  end

  private

    def ensure_authentication_token_is_present
      if authentication_token.blank?
        self.authentication_token = generate_authentication_token
      end
    end

    def generate_authentication_token
      loop do
        token = Devise.friendly_token
        break token unless User.where(authentication_token: token).first
      end
    end

    def set_organization
      self.organization = Organization.first unless organization_id
    end
end
