class AddContentTypeToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :lesson_type, :integer
  end
end
