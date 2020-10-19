class AddForeignKeyToLesson < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :lessons, :chapters, column: :chapter_id, on_delete: :cascade
  end
end
