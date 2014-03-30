$recipehash = Hash.new

module StepsHelper

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
def switchTool(usedmethod, input=nil, stepnum, recipeid)
  if input == {} && $recipehash[recipeid].useobject(stepnum-1)
    input = $recipehash[recipeid].getoutput(stepnum-1)
  end
 
  if usedmethod == 15
    input = @step.docfile.to_s
  end

  case usedmethod
    when 13 then $recipehash[recipeid].addstep(stepnum, TimelinegenPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    when 1..8 then $recipehash[recipeid].addstep(stepnum, SunlightcongressPlugin.new(usedmethod, input, stepnum))
    when 9 then $recipehash[recipeid].addstep(stepnum, SunlightpartytimePlugin.new(usedmethod, input, stepnum))
    when 11 then $recipehash[recipeid].addstep(stepnum, JsoncombinerPlugin.new(usedmethod, input, stepnum, recipeid))
    when 10 then $recipehash[recipeid].addstep(stepnum, LinkedindataPlugin.new(usedmethod, input, stepnum))
    when 12 then $recipehash[recipeid].addstep(stepnum, JsoncrossreferencePlugin.new(usedmethod, input, stepnum, recipeid))
    when 14 then $recipehash[recipeid].addstep(stepnum, UploadPlugin.new(usedmethod, input, stepnum))
    when 15 then $recipehash[recipeid].addstep(stepnum, EffscraperPlugin.new(usedmethod, input, stepnum))
    when 16 then $recipehash[recipeid].addstep(stepnum, AcluscraperPlugin.new(usedmethod, input, stepnum))
    when 17 then $recipehash[recipeid].addstep(stepnum, ExtractPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    when 18 then $recipehash[recipeid].addstep(stepnum, WlsearchscraperPlugin.new(usedmethod, input, stepnum))
    else "Unknown Tool"
  end

  $recipehash[recipeid].useobject(stepnum).switch
end

# Switches between the views for different tools
def switchView(usedmethod, input=nil, stepnum, recipeid)
  case usedmethod
  when 13
    render :partial => 'emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 1..12
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 14
    render :partial => 'upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 15
    render :partial => 'upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 16
    render :partial => 'upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 17
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 18
    render :partial => 'upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  else "Unknown Tool"
  end
end

end
