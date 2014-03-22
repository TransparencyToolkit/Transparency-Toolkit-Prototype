class AddFileToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :file, :string
  end
end
