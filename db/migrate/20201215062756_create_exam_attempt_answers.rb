class CreateExamAttemptAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_attempt_answers, id: :uuid do |t|
      t.references :option, type: :uuid, foreign_key: { to_table: 'exam_question_options'}
      t.references :question, type: :uuid, foreign_key: {to_table: 'exam_questions'}
      t.references :attempt, type: :uuid, foreign_key: { to_table: 'exam_attempts'}

      t.timestamps
    end
  end
end
