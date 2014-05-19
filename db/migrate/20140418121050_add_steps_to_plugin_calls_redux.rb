class AddStepsToPluginCallsRedux < ActiveRecord::Migration
  def change
    add_reference :plugin_calls, :step, index: true
  end
end
