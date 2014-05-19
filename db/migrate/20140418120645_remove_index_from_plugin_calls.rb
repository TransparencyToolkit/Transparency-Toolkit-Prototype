class RemoveIndexFromPluginCalls < ActiveRecord::Migration
  def change
    remove_reference :plugin_calls, :plugin_call, index: true
    remove_reference :steps, :plugin_call, index: true
  end
end
