class AddForeignKeyToCourse < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :courses, :users, column: :user_id, on_delete: :cascade
  end
end
