class SunlightcongressPlugin < PluginClass
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
  
  def votes
    s = SunlightCongress.new(@apikey)
    @output = s.get_votes(@input["Legislator Name"])
  end

  def amendments
    s = SunlightCongress.new(@apikey)
    @output = s.get_amendments(@input["Legislator Name"])
  end

  def bills
    s = SunlightCongress.new(@apikey)
    @output = s.get_bills(@input["Legislator Name"])
  end

  def updates
    s = SunlightCongress.new(@apikey)
    @output = s.get_updates(@input["Legislator Name"])
  end

  def committees
    s = SunlightCongress.new(@apikey)
    @output = s.get_committees(@input["Legislator Name"])
  end

  def hearings
    s = SunlightCongress.new(@apikey)
    @output = s.get_hearings(@input["Committee ID"])
  end

  def hearings_json
    s = SunlightCongress.new(@apikey)
    @output = s.get_hearings_json(@input)
  end

  def events
    s = SunlightCongress.new(@apikey)
    @output = s.get_events(@input["Legislator Name"])
  end
end

