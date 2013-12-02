class TimelinejsPlugin < PluginClass
  def switch
    case @method
      when 7 then showtimeline
      else "Unknown Method"
    end
  end

  def showtimeline
    @output = @input
#    <%= render :partial => "steps/emailtimeline", :locals => { :output => output } %>
  end
end
