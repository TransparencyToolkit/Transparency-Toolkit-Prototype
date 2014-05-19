class RemovePluginsReferenceOnSteps < ActiveRecord::Migration
  def change

    remove_reference :plugins, :step, index: true

  end
end
