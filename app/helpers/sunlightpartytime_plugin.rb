class SunlightpartytimePlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @apikey = "ab1437d56a5244ccb6e3c9b9ce5ff160"
    @recipeid = recipeid
  end

  def switch
    case @method
      when 9 then parties
      else "Unknown Method"
    end
  end

  def makejson
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
  
  def parties
    s = SunlightPartyTime.new(@apikey)
    @output = s.parties_clean(@input["Legislator Name"])
    makejson
  end
end

