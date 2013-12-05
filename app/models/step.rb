class Step < ActiveRecord::Base
attr_accessible :description, :name, :number, :usedplugin, :usedcall, :properties
has_one :plugin
has_one :plugin_call
has_many :fields, :through => :plugin_call
serialize :properties, Hash
end
