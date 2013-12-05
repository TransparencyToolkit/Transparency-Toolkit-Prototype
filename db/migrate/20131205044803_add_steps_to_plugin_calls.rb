class AddStepsToPluginCalls < ActiveRecord::Migration
  def change
    add_reference :plugin_calls, :plugin_call, index: true
  end
end
