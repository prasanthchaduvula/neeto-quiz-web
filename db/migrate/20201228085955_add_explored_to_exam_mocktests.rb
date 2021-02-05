class AddExploredToExamMocktests < ActiveRecord::Migration[6.0]
  def change
    add_column :exam_mocktests, :is_explored, :boolean, default: false, null: false
  end
end
