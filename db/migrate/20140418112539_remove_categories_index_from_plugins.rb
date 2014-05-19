class RemoveCategoriesIndexFromPlugins < ActiveRecord::Migration
  def change
    remove_column :plugins, :category_id
  end
end
