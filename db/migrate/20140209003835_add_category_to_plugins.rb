class AddCategoryToPlugins < ActiveRecord::Migration
  def change
    add_reference :plugins, :category, index: true
  end
end
