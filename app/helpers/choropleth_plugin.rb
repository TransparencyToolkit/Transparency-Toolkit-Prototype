class ChoroplethPlugin < PluginClass
  public
  
  def initialize(method, input=nil, stepnum, previous, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @recipeid = recipeid
    @output = nil
    @previous = previous
  end

  def switch
    case @method
      when 47 then genchoropleth
      when 49 then genchoropleth
      else "Unknown Method"
    end
  end
  
  def genchoropleth
    type = "full"
    fieldname = ""
    if @method == 47
      type = "percent"
      fieldname = @input["Percent"]
    else
      fieldname = @input["Number Field"]
    end
    c = JSONToChoropleth.new(@previous, @input["Country Field"], fieldname)
   
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(c.genfill(type)) }
    @output = '"../../../'+@stepnum.to_s+'step'+@recipeid.to_s+'.json"'
  end
end

