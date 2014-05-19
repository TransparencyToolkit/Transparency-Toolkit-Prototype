class DropPluginsTable < ActiveRecord::Migration
  def change
    drop_table :plugins
  end
end
