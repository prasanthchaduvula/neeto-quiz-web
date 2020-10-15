class CreateChapters < ActiveRecord::Migration[6.0]
  def change
    create_table :chapters, id: :uuid do |t|
      t.string :name
      t.references :course, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end
