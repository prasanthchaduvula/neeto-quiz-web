class AddOrganizationToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :organization, type: :uuid, foreign_key: true
  end
end