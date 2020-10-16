class AddContentTypeToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :content_type, :integer
  end
end
