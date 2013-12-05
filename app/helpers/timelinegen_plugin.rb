class TimelinegenPlugin < PluginClass
  public
  def switch
    case @method
      when 10 then maketimeline
      else "Unknown Method"
    end
  end
  
  def maketimeline
    # Add input processing
    @output = TimelineGen.emailTimeline(open(@input))
  end
end

