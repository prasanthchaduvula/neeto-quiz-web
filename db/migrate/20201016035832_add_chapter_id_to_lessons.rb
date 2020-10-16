class AddChapterIdToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :chapter_id, :uuid
  end
end
