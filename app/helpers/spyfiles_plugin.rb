class SpyfilesPlugin < PluginClass
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
      when 27 then alltargets
      when 28 then metadataonly
      when 29 then fulldocs
      else "Unknown Method"
    end
  end

  def alltargets
    @output = File.read("public/alltargets.json")
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def metadataonly
    @output = File.read("public/spyfilesmetadata.json")
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def fulldocs
    @output = File.read("public/spyfilesfulldocs.json")
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
end

