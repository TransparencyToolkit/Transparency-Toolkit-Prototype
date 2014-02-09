class Category < ActiveRecord::Base
  attr_accessible :type
  has_many :plugins
  self.inheritance_column = nil
end
