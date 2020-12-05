class AddUniqueNameToOption < ActiveRecord::Migration[6.0]
  def change
    add_index :exam_question_options, [:name, :question_id], unique: true
  end
end
