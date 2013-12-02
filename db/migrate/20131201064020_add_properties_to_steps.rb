class AddPropertiesToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :properties, :text
  end
end
