class PrescrapedPlugin < PluginClass
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
      when 37 then xkeyscore
      when 38 then marina
      when 39 then octave
      when 40 then anchory
      when 41 then daytonaatt
      when 42 then daytonadatabase
      when 43 then cymbalatt
      else "Unknown Method"
    end
  end

  def xkeyscore
    @output = File.read("public/xkeyscore.json")
  end

  def marina
    @output = File.read("public/marinasigint.json")
  end

  def octave
    @output = File.read("public/octavesigint.json")
  end

  def anchory
    @output = File.read("public/anchorysigint.json")
  end

  def daytonaatt
    @output = File.read("public/daytonaatt.json")
  end

  def daytonadatabase
    @output = File.read("public/daytonadatabase.json")
  end

  def cymbalatt
    @output = File.read("public/cymbalatt.json")
  end
end

