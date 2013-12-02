class CreatePluginCalls < ActiveRecord::Migration
  def change
    create_table :plugin_calls do |t|
      t.string :call
      t.string :details
      t.string :what
      t.belongs_to :plugin, index: true

      t.timestamps
    end
  end
end
