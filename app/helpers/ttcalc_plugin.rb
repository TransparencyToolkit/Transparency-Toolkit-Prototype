class TtcalcPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, recipeid, previous)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @recipeid = recipeid
    @previous = previous
  end

  def switch
    case @method
      when 45 then sumbyatt
      when 52 then count
      else "Unknown Method"
    end
  end

  def sumbyatt
    c = TTCalc.new(@previous)
    @output = c.summatching(@input["Field to Sum"], @input["Attribute to Sum By"])
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
  
  def count
    c = TTCalc.new(@previous)
    @output = c.count(@input["Field to Count Unique Values"])
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

