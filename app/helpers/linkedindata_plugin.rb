class LinkedindataPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
  end

  def switch
    case @method
      when 32 then data
      else "Unknown Method"
    end
  end
  
  def data
    l = LinkedinData.new(@input["Search Terms"])
    @output = l.getData
  end
end

