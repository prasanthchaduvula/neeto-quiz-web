class CreateCourseStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :course_students, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
		  t.references :course, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end
