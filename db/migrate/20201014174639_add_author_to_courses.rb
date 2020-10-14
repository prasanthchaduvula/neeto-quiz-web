class AddAuthorToCourses < ActiveRecord::Migration[6.0]
  def change
    add_reference :courses, :author, references: :users, index: true,  null: false
  end
end
