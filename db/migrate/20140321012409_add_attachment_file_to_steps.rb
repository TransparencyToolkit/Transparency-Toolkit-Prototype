class AddAttachmentFileToSteps < ActiveRecord::Migration
  def self.up
    change_table :steps do |t|
      t.attachment :file
    end
  end

  def self.down
    drop_attached_file :steps, :file
  end
end
