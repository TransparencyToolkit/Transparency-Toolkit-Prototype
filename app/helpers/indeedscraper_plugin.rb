class IndeedscraperPlugin < PluginClass
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
      when 34 then scraperesume
      when 35 then scrapejob
      else "Unknown Method"
    end
  end
  
  def scraperesume
    i = IndeedScraper.new(@input["Keyword"], @input["Location"])
    i.searchResumes
    @output = i.getOutput
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def scrapejob
    i = IndeedScraper.new(@input["Keyword"], @input["Location"])
    i.searchJobs
    @output = i.getOutput
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

