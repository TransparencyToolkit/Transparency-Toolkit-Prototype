class AddCategoriesToPlugins < ActiveRecord::Migration
  def change
    add_column :plugins, :category, :string
  end
end
