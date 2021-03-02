# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :rememberable
  devise :database_authenticatable, authentication_keys: [:phone_number]

  enum role: { regular_user: 0, admin: 1 }

  has_many :courses, dependent: :destroy
  has_many :course_students, dependent: :destroy
  has_many :joined_courses, through: :course_students,  source: :course
  has_many :orders, dependent: :destroy
  has_many :mocktests, class_name: "Exam::Mocktest", dependent: :destroy
  has_one :payment_details, class_name: "PaymentDetail", dependent: :destroy
  has_many :exam_students, class_name: "Exam::Student", dependent: :destroy
  has_many :joined_mocktests, through: :exam_students, source: :mocktest
  has_many :attempts, class_name: "Exam::Attempt", dependent: :destroy

  belongs_to :organization

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

  def my_courses
    self.courses + self.joined_courses
  end

  def my_mocktests
    self.mocktests + self.joined_mocktests
  end

  def admin?
    role == "admin"
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
