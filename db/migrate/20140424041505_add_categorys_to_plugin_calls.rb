class AddCategorysToPluginCalls < ActiveRecord::Migration
  def change
    add_column :plugin_calls, :category, :string
  end
end
