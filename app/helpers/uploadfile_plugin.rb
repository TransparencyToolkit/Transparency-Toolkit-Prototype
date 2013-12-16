class UploadfilePlugin < PluginClass
  public
  def switch
    case @method
      when 17 then upload
      else "Unknown Method"
    end
  end
  
  def upload
    # @output = @input["File Path"]
  end
end

