# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable, :rememberable
  devise :database_authenticatable, authentication_keys: [:phone_number]

  validates :first_name, :last_name, presence: true, on: :update
  validates :phone_number, presence: true, numericality: true, length: { is: 13 }, uniqueness: true

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
end
