# frozen_string_literal: true

class Organization < ApplicationRecord
  SUBDOMAIN_FORMAT_REGEX = /\A[a-z\d]+(-[a-z\d]+)*\z/
  PLATFORM_SUBDOMAINS = %w(app www).freeze
  RESERVED_SUBDOMAINS = %w(www).freeze

  has_many :users, dependent: :destroy
  has_many :courses, through: :users
  has_many :mocktests, through: :users

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
    self.users.where(role: "instructor")
  end

  def students
    self.users.where(role: "student")
  end
end
