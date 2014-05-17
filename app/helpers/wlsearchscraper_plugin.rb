class WlsearchscraperPlugin < PluginClass
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
      when 19 then scrapeCables
      else "Unknown Method"
    end
  end
  
  def scrapeCables
    w = WLSearchScraper.new(@input["Terms to Search for in Cables"])
    @output = w.scrape
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

