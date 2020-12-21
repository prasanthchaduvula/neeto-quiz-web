class CreateExamAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_attempts, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.references :mocktest, type: :uuid, foreign_key: { to_table: 'exam_mocktests'}

      t.timestamps
    end
  end
end
