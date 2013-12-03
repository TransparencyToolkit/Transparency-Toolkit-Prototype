class AddPluginCallToSteps < ActiveRecord::Migration
  def change
    add_reference :steps, :plugin_call, index: true
  end
end
