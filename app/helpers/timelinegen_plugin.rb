class TimelinegenPlugin < PluginClass
  public
  def switch
    case @method
      when 15 then maketimeline
      else "Unknown Method"
    end
  end
  
  def maketimeline
    @output = TimelineGen.emailTimeline(open(@input["File Path"]))
  end
end

