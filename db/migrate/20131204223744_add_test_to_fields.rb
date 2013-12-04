class AddTestToFields < ActiveRecord::Migration
  def change
    add_column :plugin_call_fields, :test, :string
  end
end
