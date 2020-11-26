class AddExploredToCourse < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :is_explored, :boolean, default: false, null: false
  end
end
