class PluginCall < ActiveRecord::Base
  belongs_to :plugin
  attr_accessible :call, :details, :what, :fields_attributes
  has_many :plugin_call_fields
  accepts_nested_attributes_for :plugin_call_fields, allow_destroy: true
  # has_many :fields, class_name: "PluginCallField"
  # accepts_nested_attributes_for :fields, allow_destroy: true
end
