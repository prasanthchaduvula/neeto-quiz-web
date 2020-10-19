class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :content
      t.timestamps
    end
  end
end
