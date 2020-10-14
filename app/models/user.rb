# frozen_string_literal: true

class User < ApplicationRecord
  validates :first_name, :last_name, :phone_number, presence: true
  validates :phone_number, numericality: true, length: { is: 10 }, uniqueness: true
end
