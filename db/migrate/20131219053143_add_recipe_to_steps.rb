class AddRecipeToSteps < ActiveRecord::Migration
  def change
    add_reference :steps, :recipe, index: true
  end
end
