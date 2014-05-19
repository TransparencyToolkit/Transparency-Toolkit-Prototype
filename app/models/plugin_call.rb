class PluginCall < ActiveRecord::Base
  has_many :steps
  has_many :recipes, through: :steps
  attr_accessible :call, :details, :what, :category, :fields_attributes
  has_many :plugin_call_fields
  has_many :fields, class_name: "PluginCallField"
  accepts_nested_attributes_for :fields, allow_destroy: true
end
