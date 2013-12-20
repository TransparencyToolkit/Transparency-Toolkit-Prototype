class JsoncombinerPlugin < PluginClass
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
      when 31 then concatenate
      else "Unknown Method"
    end
  end
  
  def concatenate
    json1 = $recipehash[@recipeid].getoutput(@input["Step # of Data 1"].to_i)
    json2 = $recipehash[@recipeid].getoutput(@input["Step # of Data 2"].to_i)
    c = JSONCombiner.new(json1, json2)
    @output = c.concatenate
  end
end

