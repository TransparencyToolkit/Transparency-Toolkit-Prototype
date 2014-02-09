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
      when 11 then concatenate
      else "Unknown Method"
    end
  end
  
  def concatenate
    data1 = @input["First Dataset to Combine"].split(".")
    data2 = @input["Second Dataset to Combine"].split(".")
    json1 = $recipehash[@recipeid].getoutput(data1[0].to_i)
    json2 = $recipehash[@recipeid].getoutput(data2[0].to_i)
    c = JSONCombiner.new(json1, json2)
    @output = c.concatenate
  end
end

