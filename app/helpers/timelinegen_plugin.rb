class TimelinegenPlugin < PluginClass
  public
  def switch
    case @method
      when 6 then maketimeline
      else "Unknown Method"
    end
  end
  
  def maketimeline
    @output = TimelineGen.emailTimeline(open(@input))
  end
end

