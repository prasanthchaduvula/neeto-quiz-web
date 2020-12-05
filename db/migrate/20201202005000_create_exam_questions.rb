class CreateExamQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_questions, id: :uuid do |t|
      t.text :description
      t.references :mocktest, type: :uuid, foreign_key: { to_table: 'exam_mocktests', on_delete: :cascade }
      t.timestamps
    end
  end
end
