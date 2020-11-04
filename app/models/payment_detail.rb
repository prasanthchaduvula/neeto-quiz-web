# frozen_string_literal: true

class PaymentDetail < ApplicationRecord
  enum account_type: { savings: 0, current: 1 }

  belongs_to :user

  before_validation { email_id.downcase! }

  validates :razorpay_account_id, presence: true, uniqueness: true
  validates	:ifsc, presence: true, length: { is: 11 }
  validates :account_number,
    presence: true,
    length: { minimum: 11, maximum: 16 },
    numericality: { only_integer: true }
  validates :account_type, presence: true
  validates :business_name, presence: true
  validates :email_id,
    presence: true,
    uniqueness: true,
    format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
              message: "is not a valid email address" }
end
