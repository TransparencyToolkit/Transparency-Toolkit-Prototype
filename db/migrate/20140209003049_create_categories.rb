class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :type

      t.timestamps
    end
  end
end
