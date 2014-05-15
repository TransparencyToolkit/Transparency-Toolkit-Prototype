load 'entityextractor.rb'
load 'extractdates.rb'
require 'treat'

class ExtractPlugin < PluginClass
  include Treat::Core::DSL

  public
  def initialize(method, input=nil, stepnum, previous)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @previous = previous
  end

  def switch
    case @method
      when 18 then extractdates
      else "Unknown Method"
    end
  end
  
  def extractdates
    d = EntityExtractor.new(@previous, @input["Field to Extract From"])
    save = d.extract("date", nil, nil, nil)
    binding.pry
    @output = d.genJSON
  end
end

