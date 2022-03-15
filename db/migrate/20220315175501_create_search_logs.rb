class CreateSearchLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :search_logs do |t|
      t.string :query_data
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
