class JsoncrossreferencePlugin < PluginClass
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
      when 34 then crossreference
      else "Unknown Method"
    end
  end
  
  def crossreference
    # This really needs a wizard to do input right (and needs fields for a specific stepnum rather than just the last)
    data1 = @input["First Dataset to Crossreference"].split(".")
    data2 = @input["Second Dataset to Crossrefrence"].split(".")
    json1 = $recipehash[@recipeid].getoutput(data1[0].to_i)
    json2 = $recipehash[@recipeid].getoutput(data2[0].to_i)
    c = JSONCrossreference.new(json1, json2)
    @output = c.compare(@input["Field to Crossreference in First Dataset"], @input["Field to Crossreference in Second Dataset"])
  end
end

