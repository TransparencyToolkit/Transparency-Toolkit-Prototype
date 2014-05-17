class GeneralscraperPlugin < PluginClass
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
      when 22 then generalscrape
      when 23 then generalscrapetable
      when 24 then generalscrape
      when 25 then generalscrapetable
      else "Unknown Method"
    end
  end
  
  def generalscrape
    l = GeneralScraper.new(@input["Site URL"].downcase, @input["Keywords"], false)
    @output = l.getData
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def generalscrapetable
    l = GeneralScraper.new(@input["Site URL"].downcase, @input["Keywords"], true)
    @output = l.getData
    g = GeneralScraper.new(@input["Site URL"].downcase, @input["Keywords"], false)
    altout = g.getData
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(altout) }
  end
end

