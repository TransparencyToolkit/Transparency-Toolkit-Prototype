class Step < ActiveRecord::Base
attr_accessible :description, :name, :number, :properties, :plugin_call_id, :docfile, :recipe_id
belongs_to :recipe,  inverse_of:  :steps
belongs_to :plugin_call, inverse_of: :steps
serialize :properties, Hash
mount_uploader :docfile, DocfileUploader
end
