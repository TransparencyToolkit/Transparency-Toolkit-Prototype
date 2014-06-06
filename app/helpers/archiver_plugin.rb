class ArchiverPlugin < PluginClass
  public
  def initialize(method, input, stepnum, recipeid, prev)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @recipeid = recipeid
    @prev = prev
  end

  def switch
    case @method
      when 32 then archiveone
      when 33 then archivemultiple
      when 36 then archivemultiplefull
      else "Unknown Method"
    end
  end
  
  def archiveone
    a = URLArchiver.new("single")
    a.archiveone(@input["URL to Archive"])
    @output = a.genOutput
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def archivemultiple
    a = URLArchiver.new("multiple")
    a.multiarchive(@prev, @input["Field with URLs"])
    @output = a.genOutput
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end
  
  def archivemultiplefull
    a = URLArchiver.new("multifull")
    a.multiarchive(@prev, @input["Field with URLs"])
    @output = a.genOutput
    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

end

