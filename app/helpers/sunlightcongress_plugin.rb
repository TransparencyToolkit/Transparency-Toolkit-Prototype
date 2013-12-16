class SunlightcongressPlugin < PluginClass
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
      when 18 then legislatorid
      when 19 then votes
      when 20 then amendments
      when 21 then bills
      when 22 then updates
      when 23 then committees
      when 24 then hearings
      when 25 then hearings_json
      when 26 then events
      else "Unknown Method"
    end
  end
  
  def legislatorid
    s = SunlightCongress.new(@apikey)
    @output = s.legislator_id(@input["Legislator Name"])
  end
  
  def votes
    s = SunlightCongress.new(@apikey)
    @output = s.get_votes(@input)
  end

  def amendments
    s = SunlightCongress.new(@apikey)
    @output = s.get_amendments(@input)
  end

  def bills
    s = SunlightCongress.new(@apikey)
    @output = s.get_bills(@input)
  end

  def updates
    s = SunlightCongress.new(@apikey)
    @output = s.get_updates(@input)
  end

  def committees
    s = SunlightCongress.new(@apikey)
    @output = s.get_committees(@input)
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
    @output = s.get_events(@input)
  end
end

