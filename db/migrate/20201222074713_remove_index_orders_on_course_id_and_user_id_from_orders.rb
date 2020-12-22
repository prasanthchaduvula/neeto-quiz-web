class RemoveIndexOrdersOnCourseIdAndUserIdFromOrders < ActiveRecord::Migration[6.0]
  def change
    remove_index :orders, name: :index_orders_on_course_id_and_user_id
  end
end
