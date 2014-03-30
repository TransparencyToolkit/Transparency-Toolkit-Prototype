class AcluscraperPlugin < PluginClass
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
    e = ACLUScraper.new(@input["URL of ACLU Case"])
    c = WordCloud.new(e.scrapeCase)
    @output = c.parse
  end
end

