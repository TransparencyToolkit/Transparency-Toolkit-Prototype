class TimelinejsPlugin < PluginClass
  def switch
    case @method
      when 11 then showtimeline
      else "Unknown Method"
    end
  end

  def showtimeline
    @output = @input
  end
end
