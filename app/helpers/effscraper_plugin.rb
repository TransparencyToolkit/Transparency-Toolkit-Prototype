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
      when 16 then scrape
      else "Unknown Method"
    end
  end
  
  def scrape
    e = EFFScraper.new(@input["URL of EFF Case"])
    @output = e.scrapeCase
  end
end

