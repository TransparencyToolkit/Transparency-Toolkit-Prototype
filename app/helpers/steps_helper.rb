$recipehash = Hash.new

module StepsHelper
def newrecipe(recipeid)
  $recipehash[recipeid] = PluginSaver.new(recipeid)
end

def switch(usedplugin, usedmethod, input=nil, stepnum, recipeid)
  if input == {} && $recipehash[recipeid].useobject(stepnum-1)
    input = $recipehash[recipeid].getoutput(stepnum-1)
  end
  
  if usedplugin == 10
    $recipehash[recipeid].addstep(stepnum, TimelinegenPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'timelinegen', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedplugin == 3
    $recipehash[recipeid].addstep(stepnum, TimelinejsPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedplugin == 6
    $recipehash[recipeid].addstep(stepnum, JsontochartPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'jsontochart', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedplugin == 7
    $recipehash[recipeid].addstep(stepnum, UploadfilePlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
  elsif usedplugin == 8
    $recipehash[recipeid].addstep(stepnum, SunlightcongressPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedplugin == 9
    $recipehash[recipeid].addstep(stepnum, SunlightpartytimePlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedplugin == 11
    $recipehash[recipeid].addstep(stepnum, JsoncombinerPlugin.new(usedmethod, input, stepnum, recipeid))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'sunlightcongress', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  end
end
end
