# frozen_string_literal: true

class Organization < ApplicationRecord
  SUBDOMAIN_FORMAT_REGEX = /\A[a-z\d]+(-[a-z\d]+)*\z/
  PLATFORM_SUBDOMAINS = %w(app www).freeze
  RESERVED_SUBDOMAINS = %w(www).freeze

  has_many :users, dependent: :destroy
  has_many :courses, through: :users
  has_many :mocktests, through: :users
  has_one :payment_details, class_name: "PaymentDetail", dependent: :destroy

  validates :name, presence: true
  validates :subdomain, presence: true,
                        length: { minimum: 2, maximum: 32 },
                        uniqueness: { case_sensitive: false, allow_nil: false },
                        format: {
                          with: SUBDOMAIN_FORMAT_REGEX,
                          message: "accepts lowercase alphanumeric and hyphen(-)"
                        },
                        exclusion: {
                          in: RESERVED_SUBDOMAINS,
                          message: "%{value} is reserved."
                        }


  def instructors
    self.users.instructor
  end

  def students
    self.users.student
  end

  def marketplace_courses
    self.courses.where(published: true, is_explored: true)
  end

  def marketplace_mocktests
    self.mocktests.where(is_published: true, is_explored: true)
  end

  def published_courses
    self.courses.where(published: true)
  end

  def published_mocktests
    self.mocktests.where(is_published: true)
  end
end
