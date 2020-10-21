class AddUniqueNameToLesson < ActiveRecord::Migration[6.0]
  def change
    add_index :lessons, [:name, :chapter_id], unique: true
  end
end
