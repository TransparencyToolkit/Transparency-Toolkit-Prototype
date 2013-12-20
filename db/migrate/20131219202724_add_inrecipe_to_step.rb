class AddInrecipeToStep < ActiveRecord::Migration
  def change
    add_column :steps, :inrecipe, :integer
  end
end
