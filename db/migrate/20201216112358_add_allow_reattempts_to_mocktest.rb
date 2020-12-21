class AddAllowReattemptsToMocktest < ActiveRecord::Migration[6.0]
  def change
    add_column :exam_mocktests, :allow_reattempts, :boolean, default: true, null: false
  end
end
