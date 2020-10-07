class CreateSignObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :sign_objects do |t|
      t.string :sign
      t.string :content

      t.timestamps
    end
  end
end
