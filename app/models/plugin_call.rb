class PluginCall < ActiveRecord::Base
  belongs_to :plugin
  attr_accessible :call, :details, :what, :fields_attributes, :plugin_id
  has_many :steps
  has_many :plugin_call_fields
  has_many :fields, class_name: "PluginCallField"
  accepts_nested_attributes_for :fields, allow_destroy: true
  accepts_nested_attributes_for :steps, allow_destroy: true
end
