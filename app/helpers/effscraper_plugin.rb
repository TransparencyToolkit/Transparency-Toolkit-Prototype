class EffscraperPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
  end

  def switch
    case @method
      when 15 then scrape
      else "Unknown Method"
    end
  end
  
  def scrape
    e = EFFScraper.new(@input["URL of EFF Case"])
    c = WordCloud.new(e.scrapeCase)
    @output = c.parse
  end
end

