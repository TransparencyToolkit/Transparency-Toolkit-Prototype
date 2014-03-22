class AddDocfileToStep < ActiveRecord::Migration
  def change
    add_column :steps, :Step, :string
    add_column :steps, :docfile, :string
  end
end
