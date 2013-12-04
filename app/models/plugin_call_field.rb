class PluginCallField < ActiveRecord::Base
  attr_accessible :field_type, :name, :required, :test
  belongs_to :plugin_call
end
