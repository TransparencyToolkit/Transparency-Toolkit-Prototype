class SunlightcongressPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @recipeid = recipeid
    @apikey = "ab1437d56a5244ccb6e3c9b9ce5ff160"
  end

  def switch
    case @method
      when 2 then votes
      when 3 then amendments
      when 4 then bills
      when 5 then updates
      when 6 then committees
      when 7 then hearings
      when 8 then hearings_json
      when 1 then events
      else "Unknown Method"
    end
  end

  def makejson
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
  
  def votes
    s = SunlightCongress.new(@apikey)
    @output = s.get_votes(@input["Legislator Name"])
    makejson
  end

  def amendments
    s = SunlightCongress.new(@apikey)
    @output = s.get_amendments(@input["Legislator Name"])
    makejson
  end

  def bills
    s = SunlightCongress.new(@apikey)
    @output = s.get_bills(@input["Legislator Name"])
    makejson
  end

  def updates
    s = SunlightCongress.new(@apikey)
    @output = s.get_updates(@input["Legislator Name"])
    makejson
  end

  def committees
    s = SunlightCongress.new(@apikey)
    @output = s.get_committees(@input["Legislator Name"])
    makejson
  end

  def hearings
    s = SunlightCongress.new(@apikey)
    @output = s.get_hearings(@input["Committee ID"])
    makejson
  end

  def hearings_json
    s = SunlightCongress.new(@apikey)
    @output = s.get_hearings_json(@input)
    makejson
  end

  def events
    s = SunlightCongress.new(@apikey)
    @output = s.get_events(@input["Legislator Name"])
    makejson
  end
end

