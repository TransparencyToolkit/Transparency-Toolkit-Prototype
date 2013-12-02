class Plugin < ActiveRecord::Base
  belongs_to :step
  attr_accessible :description, :name, :gemname, :method
  has_many :plugin_calls
  accepts_nested_attributes_for :plugin_calls, allow_destroy: true
end
