class AddStepidToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :stepid, :integer
  end
end
