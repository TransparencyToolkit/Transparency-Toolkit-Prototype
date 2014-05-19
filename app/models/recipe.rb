class Recipe < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :steps
  has_many :plugin_calls, through: :steps
  accepts_nested_attributes_for :steps, allow_destroy: true
end
