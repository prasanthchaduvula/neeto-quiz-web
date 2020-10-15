class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses, id: :uuid do |t|
      t.string :name
      t.text :description
      t.boolean :published

      t.timestamps
    end
  end
end
