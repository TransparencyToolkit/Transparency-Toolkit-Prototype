class Recipe < ActiveRecord::Base
  attr_accessible :name, :description, :recipe_id
  has_many :steps
  accepts_nested_attributes_for :steps
end
