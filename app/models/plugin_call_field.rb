class PluginCallField < ActiveRecord::Base
  attr_accessible :field_type, :name, :required, :plugin_call_id
  belongs_to :plugin_call
end
