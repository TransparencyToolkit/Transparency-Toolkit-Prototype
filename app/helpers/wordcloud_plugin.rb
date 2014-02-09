class WordcloudPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
  end

  def switch
    case @method
      when 14 then gencloud
      else "Unknown Method"
    end
  end
  
  def gencloud
    c = WordCloud.new(@input["Input Text"])
    @output = c.parse
  end
end

