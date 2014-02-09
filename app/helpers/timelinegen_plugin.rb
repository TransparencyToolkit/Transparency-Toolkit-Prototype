class TimelinegenPlugin < PluginClass
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
      when 13 then maketimeline
      else "Unknown Method"
    end
  end
  
  def maketimeline
    t = TimelineGen.new(@previous, @input["Field for Headline"], @input["Field for Text"], @input["Field for Start Date"], @input["Field for End Date"], @input["Timeline Title"])
    @output = t.timeline
  end
end

