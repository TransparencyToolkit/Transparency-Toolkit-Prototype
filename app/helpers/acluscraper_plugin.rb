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
      when 17 then scrape
      else "Unknown Method"
    end
  end
  
  def scrape
    e = ACLUScraper.new(@input["URL of ACLU Case"])
    @output = e.scrapeCase
  end
end

