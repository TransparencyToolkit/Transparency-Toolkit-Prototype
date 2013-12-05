class Step < ActiveRecord::Base
attr_accessible :description, :name, :number, :usedplugin, :usedcall, :properties, :plugin_call_id
has_one :plugin
belongs_to :plugin_call
serialize :properties, Hash
end
