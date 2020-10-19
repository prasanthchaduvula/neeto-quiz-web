class AddStatusToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :is_published, :boolean, default: false, null: false
  end
end
