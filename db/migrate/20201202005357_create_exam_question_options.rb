class CreateExamQuestionOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_question_options, id: :uuid do |t|
      t.string :name
      t.boolean :is_correct, default: false

      t.references :question, type: :uuid, foreign_key: {to_table: 'exam_questions', on_delete: :cascade }

      t.timestamps
    end
  end
end
