class AddInvitationCodeToCourse < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :invitation_code, :string
  end
end
