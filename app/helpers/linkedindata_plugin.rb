class LinkedindataPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @recipeid = recipeid
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
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def nsadata
    @output = File.read("public/nsadata.json")
  end
end

