class AddZeroDefaultValueToCoursePrice < ActiveRecord::Migration[6.0]
  def change
    change_column_default :courses, :price, 0
  end
end
