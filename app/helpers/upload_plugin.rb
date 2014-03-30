class UploadPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
  end

  def switch
    case @method
      when 15 then uploadconvert
      else "Unknown Method"
    end
  end
  
  def uploadconvert
    u = UploadConvert.new("public" + @input)
    c = WordCloud.new(u.handleDoc)
    @output = c.parse
  end
end

