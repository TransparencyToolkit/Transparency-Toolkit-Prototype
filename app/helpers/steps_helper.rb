$recipehash = Hash.new

module StepsHelper
def newrecipe(recipeid)
  $recipehash[recipeid] = PluginSaver.new(recipeid)
end

def setnum(recipeid)
  return $recipehash[recipeid].getlastnum + 1
end

def switch(usedmethod, input=nil, stepnum, recipeid)
  if input == {} && $recipehash[recipeid].useobject(stepnum-1)
    input = $recipehash[recipeid].getoutput(stepnum-1)
  end
  
  if usedmethod == 30
    $recipehash[recipeid].addstep(stepnum, TimelinegenPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod == 16
    $recipehash[recipeid].addstep(stepnum, JsontochartPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'jsontochart', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod >= 19 && usedmethod <= 26
    $recipehash[recipeid].addstep(stepnum, SunlightcongressPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod == 28
    $recipehash[recipeid].addstep(stepnum, SunlightpartytimePlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod == 31
    $recipehash[recipeid].addstep(stepnum, JsoncombinerPlugin.new(usedmethod, input, stepnum, recipeid))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  end
end
end
