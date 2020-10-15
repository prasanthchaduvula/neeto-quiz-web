class AddDefaultValueToCourse < ActiveRecord::Migration[6.0]
  def change
    change_column_default :courses, :published, false
  end
end
