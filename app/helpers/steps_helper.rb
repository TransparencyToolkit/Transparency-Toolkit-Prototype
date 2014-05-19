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

# Returns preset array for dropdown
def getpreset(type)
  presetarray = Array.new
  
  # Go through govsites data
  if type = "govsites"
    sites = JSON.parse(File.read("public/sites.json"))
    sites["data"].each do |d|
      presetarray.push(d[8])
    end
  end

  return presetarray
end

# Returns array of fields in JSON from last step
def getfields(recipeid)
  if ($recipehash[recipeid]) != nil && ($recipehash[recipeid].getlastnum != 0)
    $recipehash[recipeid].useobject($recipehash[recipeid].getlastnum)
    data = JSON.parse($recipehash[recipeid].getoutput($recipehash[recipeid].getlastnum))
    keylist = Array.new

    if data[1]
      l = data[1]
    else
      l = data
    end

    dhash = Hash[*l.flatten]
    dhash.each_key do |key|
      if keylist.include? key
      else keylist.push(key)
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
    when 1..8 then $recipehash[recipeid].addstep(stepnum, SunlightcongressPlugin.new(usedmethod, input, stepnum, recipeid))
    when 9 then $recipehash[recipeid].addstep(stepnum, SunlightpartytimePlugin.new(usedmethod, input, stepnum, recipeid))
    when 11 then $recipehash[recipeid].addstep(stepnum, JsoncombinerPlugin.new(usedmethod, input, stepnum, recipeid))
    when 10 then $recipehash[recipeid].addstep(stepnum, LinkedindataPlugin.new(usedmethod, input, stepnum, recipeid))
    when 14 then $recipehash[recipeid].addstep(stepnum, WordcloudPlugin.new(usedmethod, input, stepnum))
    when 12 then $recipehash[recipeid].addstep(stepnum, JsoncrossreferencePlugin.new(usedmethod, input, stepnum, recipeid))
    when 15 then $recipehash[recipeid].addstep(stepnum, UploadPlugin.new(usedmethod, input, stepnum, recipeid))
    when 16 then $recipehash[recipeid].addstep(stepnum, EffscraperPlugin.new(usedmethod, input, stepnum, recipeid))
    when 17 then $recipehash[recipeid].addstep(stepnum, AcluscraperPlugin.new(usedmethod, input, stepnum, recipeid))
    when 18 then $recipehash[recipeid].addstep(stepnum, ExtractPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1)))
    when 19 then $recipehash[recipeid].addstep(stepnum, WlsearchscraperPlugin.new(usedmethod, input, stepnum, recipeid))
    when 20 then $recipehash[recipeid].addstep(stepnum, LinkedindataPlugin.new(usedmethod, input, stepnum, recipeid))
    when 21 then $recipehash[recipeid].addstep(stepnum, NetworkgraphPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1), recipeid))
    when 22..25 then $recipehash[recipeid].addstep(stepnum, GeneralscraperPlugin.new(usedmethod, input, stepnum, recipeid))
    when 26 then $recipehash[recipeid].addstep(stepnum, UnvoterecordsPlugin.new(usedmethod, input, stepnum, recipeid))
    else "Unknown Tool"
  end

  $recipehash[recipeid].useobject(stepnum).switch
end

# Switches between the views for different tools
def switchView(usedmethod, input=nil, stepnum, recipeid)
  case usedmethod
  when 13
    render :partial => 'recipes/emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 1..12
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 14
    render :partial => 'recipes/wordcloud', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 15
    render :partial => 'recipes/uploadsingle', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 16
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 17
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 18
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 19
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 20
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 21
    render :partial => 'recipes/networkgraph', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :firstnode => $recipehash[recipeid].getnode(stepnum), :secondnode => $recipehash[recipeid].getothernode(stepnum) }
  when 22
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 23
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 24
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 25
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 26
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  else "Unknown Tool"
  end
end

end
