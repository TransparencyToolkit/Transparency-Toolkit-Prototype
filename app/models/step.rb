class Step < ActiveRecord::Base
attr_accessible :description, :name, :number, :usedplugin, :usedcall, :properties, :plugin_call_id, :inrecipe, :stepid, :docfile
belongs_to :plugin_call
belongs_to :recipe
serialize :properties, Hash

mount_uploader :docfile, DocfileUploader
end
