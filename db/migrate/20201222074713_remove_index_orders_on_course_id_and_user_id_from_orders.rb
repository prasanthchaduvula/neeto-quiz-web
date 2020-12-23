class RemoveIndexOrdersOnCourseIdAndUserIdFromOrders < ActiveRecord::Migration[6.0]
  def up
    remove_index :orders, name: :index_orders_on_course_id_and_user_id if index_exists?(:orders, name: :index_orders_on_course_id_and_user_id)
  end

  def down
    add_index :orders, [:course_id, :user_id]
  end
end
