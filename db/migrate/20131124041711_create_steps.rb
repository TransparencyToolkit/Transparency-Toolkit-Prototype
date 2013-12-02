class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :name
      t.string :description
      t.string :number
      t.string :usedplugin
      t.string :usedcall

      t.timestamps
    end
  end
end
