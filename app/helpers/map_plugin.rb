class MapPlugin < PluginClass
  public
  
  def initialize(method, input=nil, stepnum, previous, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @recipeid = recipeid
    @output = nil
    @previous = previous
    @startlocation = ""
    @startzoom = 1
  end

  def switch
    case @method
      when 51 then genmap
      else "Unknown Method"
    end
  end
  
  def genmap
    g = JSONToMap.new(@previous, @input["Location Field"], @input["Picture Field"], @input["Title Field"])
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(g.genmap) }
    url = '"../../../'+@stepnum.to_s+'step'+@recipeid.to_s+'.json"'
    
    @startlocation = g.geocodestart(@input["Start Location"])
    @startzoom = @input["Start Zoom"].to_i
    @output = [url, @startlocation, @startzoom]
  end
end

