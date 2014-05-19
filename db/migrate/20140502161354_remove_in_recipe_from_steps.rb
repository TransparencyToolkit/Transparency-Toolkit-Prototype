class RemoveInRecipeFromSteps < ActiveRecord::Migration
  def change
    remove_column :steps, :inrecipe
    remove_column :steps, :stepid
    remove_column :steps, :usedcall
  end
end
