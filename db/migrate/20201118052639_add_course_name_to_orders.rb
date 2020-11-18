# frozen_string_literal: true

class AddCourseNameToOrders < ActiveRecord::Migration[6.0]
  def up
    add_column :orders, :course_name, :string

    Order.transaction do
      Order.all.each do |order|
        order.update!(course_name: order.course.name)
      end
    end

    change_column_null :orders, :course_name, false
  end

  def down
    remove_column :orders, :course_name
  end
end
