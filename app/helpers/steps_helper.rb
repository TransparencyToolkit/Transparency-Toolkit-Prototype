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
  if type === "govsites"
    sites = JSON.parse(File.read("public/sites.json"))
    sites["data"].each do |d|
      presetarray.push(d[8])
    end
  elsif type === "emails"
    presetarray = ["All Formats","firstname.lastname@domain","firstinitiallastname@domain","firstname_lastname@domain","lastnamefirstinitial@domain","lastname@domain"]
  end

  return presetarray
end

# Returns array of fields in JSON from last step
def getfields(recipeid)
  if ($recipehash[recipeid]) != nil && ($recipehash[recipeid].getlastnum != 0)
    $recipehash[recipeid].useobject($recipehash[recipeid].getlastnum)
    data = JSON.parse($recipehash[recipeid].getoutput($recipehash[recipeid].getlastnum))
    fields = Set.new

    data.map { |o| fields.merge(o.keys) }

    return fields
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
    when 27..29 then $recipehash[recipeid].addstep(stepnum, SpyfilesPlugin.new(usedmethod, input, stepnum, recipeid))
    when 30..31 then $recipehash[recipeid].addstep(stepnum, ExtractPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1), recipeid))
    when 32 then $recipehash[recipeid].addstep(stepnum, ArchiverPlugin.new(usedmethod, input, stepnum, recipeid, nil))
    when 33 then $recipehash[recipeid].addstep(stepnum, ArchiverPlugin.new(usedmethod, input, stepnum, recipeid, $recipehash[recipeid].getoutput(stepnum-1)))
    when 34..35 then $recipehash[recipeid].addstep(stepnum, IndeedscraperPlugin.new(usedmethod, input, stepnum, recipeid))
    when 36 then $recipehash[recipeid].addstep(stepnum, ArchiverPlugin.new(usedmethod, input, stepnum, recipeid, $recipehash[recipeid].getoutput(stepnum-1)))
    when 37..43 then $recipehash[recipeid].addstep(stepnum, PrescrapedPlugin.new(usedmethod, input, stepnum, recipeid))
    when 44 then $recipehash[recipeid].addstep(stepnum, TordataPlugin.new(usedmethod, input, stepnum, recipeid))
    when 45 then $recipehash[recipeid].addstep(stepnum, TtcalcPlugin.new(usedmethod, input, stepnum, recipeid, $recipehash[recipeid].getoutput(stepnum-1)))
    when 46 then $recipehash[recipeid].addstep(stepnum, TotalinternetusersPlugin.new(usedmethod, input, stepnum, recipeid))
    when 47 then $recipehash[recipeid].addstep(stepnum, ChoroplethPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1), recipeid))
    when 48 then $recipehash[recipeid].addstep(stepnum, TordataPlugin.new(usedmethod, input, stepnum, recipeid))
    when 49 then $recipehash[recipeid].addstep(stepnum, ChoroplethPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1), recipeid))
    when 50 then $recipehash[recipeid].addstep(stepnum, PopulationPlugin.new(usedmethod, input, stepnum, recipeid))
    when 51 then $recipehash[recipeid].addstep(stepnum, MapPlugin.new(usedmethod, input, stepnum, $recipehash[recipeid].getoutput(stepnum-1), recipeid))
    when 52 then $recipehash[recipeid].addstep(stepnum, TtcalcPlugin.new(usedmethod, input, stepnum, recipeid, $recipehash[recipeid].getoutput(stepnum-1)))
  when 53..56 then $recipehash[recipeid].addstep(stepnum, NametoemailPlugin.new(usedmethod, input, stepnum, recipeid, $recipehash[recipeid].getoutput(stepnum-1)))
    else "Unknown Tool"
  end

  $recipehash[recipeid].useobject(stepnum).switch
end

# Switches between the views for different tools
def switchView(usedmethod, input=nil, stepnum, recipeid)
  binding.pry
  case usedmethod
  when 13
    render :partial => 'recipes/emailtimeline', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 1..10
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 11
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 12
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
    render :partial => 'recipes/link', :locals => { :path => "../nsadata.json" }
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
  when 27..28
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 29
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 30..31
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 32
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 33..34
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 35
    render :partial => 'recipes/upload', :locals => { :output => $recipehash[recipeid].getoutput(stepnum), :stepnum => stepnum }
  when 36..43
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 44
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 45
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 46
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 47
    render :partial => 'recipes/choropleth', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 48
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 49
    render :partial => 'recipes/choropleth', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 50
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  when 51
    render :partial => 'recipes/map', :locals => { :output => $recipehash[recipeid].getoutput(stepnum) }
  when 52
    @j = JSONToChart.new($recipehash[recipeid].getoutput(stepnum), stepnum)
    render :partial => 'recipes/datatable', :locals => { :output => @j.table, :stepnum => stepnum }
  when 53..36
    render :partial => 'recipes/link', :locals => { :output => @output, :stepnum => stepnum }
  else "Unknown Tool"
  end
end

end
