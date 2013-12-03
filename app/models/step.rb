class Step < ActiveRecord::Base
attr_accessible :description, :name, :number, :usedplugin, :usedcall, :properties
has_one :plugin_call
# has_one :plugin
serialize :properties, Hash
end
