class SunlightpartytimePlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @apikey = "ab1437d56a5244ccb6e3c9b9ce5ff160"
  end

  def switch
    case @method
      when 9 then parties
      else "Unknown Method"
    end
  end
  
  def parties
    s = SunlightPartyTime.new(@apikey)
    @output = s.parties_clean(@input["Legislator Name"])
  end
end

