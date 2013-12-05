class AddStepToPluginCallFields < ActiveRecord::Migration
  def change
    add_reference :plugin_call_fields, :step, index: true
  end
end
