class CreatePluginCallFields < ActiveRecord::Migration
  def change
    create_table :plugin_call_fields do |t|
      t.string :name
      t.string :field_type
      t.boolean :required
      t.belongs_to :plugin_call, index: true

      t.timestamps
    end
  end
end
