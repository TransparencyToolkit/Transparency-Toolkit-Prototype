module StepsHelper
$recipehash = Hash.new

# Adds recipe to hash and makes object for tool data
def newrecipe(recipeid)
  $recipehash[recipeid] = PluginSaver.new(recipeid)
end

# Sets the step number
def setnum(recipeid)
  return $recipehash[recipeid].getlastnum + 1
end

# Returns array of fields in JSON from last step
def getfields(recipeid)
  if ($recipehash[recipeid]) != nil && ($recipehash[recipeid].getlastnum != 0)
    $recipehash[recipeid].useobject($recipehash[recipeid].getlastnum)
    data = JSON.parse($recipehash[recipeid].getoutput($recipehash[recipeid].getlastnum))
    keylist = Array.new

    data.each do |l|
      dhash = Hash[*l.flatten]
      dhash.each_key do |key|
        if keylist.include? key
        else keylist.push(key)
        end
      end
    end
  
    return keylist
  end
end

# Returns an array with details on all previous steps in recipe
def getsteps(recipeid)
  if ($recipehash[recipeid]) != nil && ($recipehash[recipeid].getlastnum != 0)
    lastnum = $recipehash[recipeid].getlastnum
    steparray = Array.new
    
    (1..lastnum).each do |n|
      step = Step.where(number: n.to_s, inrecipe: recipeid).take
      plugin = PluginCall.find(step.plugin_call_id).what
      steparray.push(n.to_s + ". " + step.name + " (Tool: " + plugin + ")")
    end

    return steparray
  end
end

# Switches between tools
def switch(usedmethod, input=nil, stepnum, recipeid)
  if input == {} && $recipehash[recipeid].useobject(stepnum-1)
    input = $recipehash[recipeid].getoutput(stepnum-1)
  end
  
  if usedmethod == 13
    $recipehash[recipeid].addstep(stepnum, TimelinegenPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod >= 1 && usedmethod <= 8
    $recipehash[recipeid].addstep(stepnum, SunlightcongressPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  elsif usedmethod == 9
    $recipehash[recipeid].addstep(stepnum, SunlightpartytimePlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  elsif usedmethod == 11
    $recipehash[recipeid].addstep(stepnum, JsoncombinerPlugin.new(usedmethod, input, stepnum, recipeid))
    $recipehash[recipeid].useobject(stepnum).switch
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  elsif usedmethod == 10
    $recipehash[recipeid].addstep(stepnum, LinkedindataPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  elsif usedmethod == 14
    $recipehash[recipeid].addstep(stepnum, WordcloudPlugin.new(usedmethod, input, stepnum))
    $recipehash[recipeid].useobject(stepnum).switch
    render :partial => 'wordcloud', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  elsif usedmethod == 12
    $recipehash[recipeid].addstep(stepnum, JsoncrossreferencePlugin.new(usedmethod, input, stepnum, recipeid))
    $recipehash[recipeid].useobject(stepnum).switch
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  end
end
end
