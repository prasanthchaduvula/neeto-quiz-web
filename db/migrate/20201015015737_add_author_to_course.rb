class AddAuthorToCourse < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :user_id, :uuid
  end
end
