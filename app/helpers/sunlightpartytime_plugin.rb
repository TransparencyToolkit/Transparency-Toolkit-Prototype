class SunlightpartytimePlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @apikey = "apikey"
  end

  def switch
    case @method
      when 29 then crp_id
      when 28 then parties
      else "Unknown Method"
    end
  end
  
  def crp_id
    s = SunlightPartyTime.new(@apikey)
    @output = s.crp_id(@input["Legislator Name"])
  end
  
  def parties
    s = SunlightPartyTime.new(@apikey)
    @output = s.parties_clean(@input)
  end
end

