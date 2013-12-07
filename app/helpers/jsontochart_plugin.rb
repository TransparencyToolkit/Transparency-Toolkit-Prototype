class JsontochartPlugin < PluginClass
  public
  def switch
    case @method
      when 16 then maketimeline
      else "Unknown Method"
    end
  end
  
  def maketimeline
    j = JSONToChart.new(@input)
    @output = j.table
  end
end

