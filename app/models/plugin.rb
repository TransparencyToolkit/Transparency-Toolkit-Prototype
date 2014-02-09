class Plugin < ActiveRecord::Base
  belongs_to :step
  belongs_to :category
  attr_accessible :description, :name, :gemname, :method, :category_id
  has_many :plugin_calls
  has_many :fields, through: :plugin_calls
  accepts_nested_attributes_for :plugin_calls, allow_destroy: true
end
