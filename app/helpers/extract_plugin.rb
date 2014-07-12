load 'entityextractor.rb'
load 'extractdates.rb'
require 'treat'

class ExtractPlugin < PluginClass
  include Treat::Core::DSL

  public
  def initialize(method, input=nil, stepnum, previous, recipeid)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @previous = previous
    @recipeid = recipeid
  end

  def switch
    case @method
      when 18 then extractdates
      when 30 then extractterms
      when 31 then extractallcaps
      else "Unknown Method"
    end
  end
  
  def extractdates
    d = EntityExtractor.new(@previous, @input["Field to Extract From"])
    save = d.extract("date", nil, nil, nil)
    @output = d.genJSON
  end

  def extractterms
    d = EntityExtractor.new(@previous, @input["Field to Extract From"])
    args = Array.new
    @input["Terms to Extract"].split(",").each do |a|
      args.push(a.lstrip)
    end
    
    save = d.extract("set", nil, nil, *args)
    json = d.genJSON
    
    if @input["Only Return Matches"] == "1"
      pjson = JSON.parse(json)
      outarray = Array.new
      pjson.each do |p|
        if !(p["extract"].empty?)
          outarray.push(p)
        end
      end
      @output = JSON.pretty_generate(outarray)
    else
      @output = json
    end

    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def extractallcaps
    d = EntityExtractor.new(@previous, @input["Field to Extract From"])
    args = Array.new
    @input["Terms to Ignore"].split(",").each do |a|
      args.push(a.lstrip)
    end

    save = d.extract("ALLCAPS", @input["Min # of ALLCAPS Chars in Row"].to_i, *args, nil)
    json = d.genJSON
    
    if @input["Only Return Matches"] == "1"
      pjson = JSON.parse(json)
      outarray = Array.new
      pjson.each do |p|
        if !(p["extract"].empty?)
          outarray.push(p)
        end
      end
      @output = JSON.pretty_generate(outarray)
    else
      @output = json
    end

    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

