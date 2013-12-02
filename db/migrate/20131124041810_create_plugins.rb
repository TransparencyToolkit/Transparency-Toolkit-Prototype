class CreatePlugins < ActiveRecord::Migration
  def change
    create_table :plugins do |t|
      t.string :name
      t.string :description
      t.string :gemname
      t.string :method
      t.belongs_to :step, index: true

      t.timestamps
    end
  end
end
