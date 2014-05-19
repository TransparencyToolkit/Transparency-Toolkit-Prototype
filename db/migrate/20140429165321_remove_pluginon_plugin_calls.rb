class RemovePluginonPluginCalls < ActiveRecord::Migration
  def up
    remove_column :plugin_calls, :plugin_id
    remove_column :steps, :usedplugin, :usedcall, :stepid
    remove_column :plugin_calls, :step_id
    add_reference :steps, :plugin_calls, index: true

  end
end