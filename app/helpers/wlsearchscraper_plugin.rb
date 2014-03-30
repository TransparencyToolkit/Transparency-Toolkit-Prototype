class WlsearchscraperPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
  end

  def switch
    case @method
      when 18 then scrapeCables
      else "Unknown Method"
    end
  end
  
  def scrapeCables
    w = WLSearchScraper.new(@input["Terms to Search for in Cables"])
    c = WordCloud.new(w.scrape)
    @output = c.parse
  end
end

