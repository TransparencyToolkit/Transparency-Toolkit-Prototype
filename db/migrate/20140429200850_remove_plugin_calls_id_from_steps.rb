class RemovePluginCallsIdFromSteps < ActiveRecord::Migration
  def change
    remove_column :steps, :plugin_calls_id, index: true
  end
end
