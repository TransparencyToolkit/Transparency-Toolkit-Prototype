class TordataPlugin < PluginClass
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
      when 44 then users
      when 48 then servers
      else "Unknown Method"
    end
  end
  
  def users
    datacsv = File.read(open("https://metrics.torproject.org/stats/clients.csv"))
    filename = "public/"+@stepnum.to_s+"step"+@recipeid.to_s+".csv"
    outfile = "public/"+@stepnum.to_s+"step"+@recipeid.to_s+"temp.json"
    File.open(filename, 'w') {|file| file.write(datacsv) }
    File.open(filename, 'r') do |input|
      File.open(outfile, 'w') do |output|
        CSV2JSON.parse(input, output)
      end
    end
    
    c = CountryConvert.new(File.read(outfile), "country")
    @output = c.convert
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def servers
    datacsv = File.read(open("https://metrics.torproject.org/stats/servers.csv"))
    filename = "public/"+@stepnum.to_s+"step"+@recipeid.to_s+".csv"
    outfile = "public/"+@stepnum.to_s+"step"+@recipeid.to_s+"temp.json"
    File.open(filename, 'w') {|file| file.write(datacsv) }
    File.open(filename, 'r') do |input|
      File.open(outfile, 'w') do |output|
        CSV2JSON.parse(input, output)
      end
    end

    c = CountryConvert.new(File.read(outfile), "country")
    @output = c.convert
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

