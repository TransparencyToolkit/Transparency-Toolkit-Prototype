class PluginSaver
  def initialize(recipeid)
    @pluginhash = Hash.new
    @id = recipeid
  end

  def addstep(stepnum, stepobject)
    @pluginhash[stepnum] = stepobject
  end

  def useobject(stepnum)
    return @pluginhash[stepnum]
  end

  def getoutput(stepnum)
    return @pluginhash[stepnum].output
  end
end
