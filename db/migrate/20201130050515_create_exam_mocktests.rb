class CreateExamMocktests < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_mocktests, id: :uuid do |t|
      t.string :name 
      t.boolean :is_published, default: false
      t.decimal :price, precision: 7, scale: 2, default: 0
      t.string :invitation_code

      t.references :user, type: :uuid, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
