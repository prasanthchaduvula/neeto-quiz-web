class AddUniqueNameToChapter < ActiveRecord::Migration[6.0]
  def change
    add_index :chapters, [:name, :course_id], unique: true
  end
end
