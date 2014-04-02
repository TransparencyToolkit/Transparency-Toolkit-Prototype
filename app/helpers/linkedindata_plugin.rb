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
      when 10 then data
      when 20 then nsadata
      else "Unknown Method"
    end
  end
  
  def data
    l = LinkedinData.new(@input["Search Terms"])
    @output = l.getData
  end

  def nsadata
    @output = JSON.parse(File.read("public/nsadata.json"))
  end
end

