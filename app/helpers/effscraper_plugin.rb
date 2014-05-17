class EffscraperPlugin < PluginClass
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
      when 16 then scrape
      else "Unknown Method"
    end
  end
  
  def scrape
    e = EFFScraper.new(@input["URL of EFF Case"])
    @output = e.scrapeCase
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

