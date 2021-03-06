# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :rememberable
  devise :database_authenticatable, authentication_keys: [:phone_number]

  enum role: { instructor: 0, student: 1 }

  validates :first_name, :last_name, presence: true, on: :update
  validates :phone_number, presence: true, numericality: true, length: { is: 13 }, uniqueness: true

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
end
