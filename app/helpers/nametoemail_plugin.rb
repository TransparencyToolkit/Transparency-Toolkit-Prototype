class NametoemailPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, recipeid, previous)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @recipeid = recipeid
    @previous = previous
  end

  def switch
    case @method
      when 53 then setdomain
      when 54 then domainfield
      when 55 then setdomain
      when 56 then domainfield
      else "Unknown Method"
    end
  end

  def setdomain
    n = NameToEmail.new(@previous, @input["Name Field"], true, @input["Domain Name"], nil, getformat(@input["Email Formats"]))
    n.genemails

    if @method == 53
      @output = n.emaillist
    elsif @method == 55
      @output = n.jsonwithemails
    end

    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end

  def domainfield
    n = NameToEmail.new(@previous, @input["Name Field"], false, nil, @input["Url Field"], getformat(@input["Email Formats"]))
    n.genemails

    if @method == 54
      @output = n.emaillist
    elsif @method == 56
      @output = n.jsonwithemails
    end

    File.open("public/"+@stepnum.to_s+"step"+@recipeid.to_s+".json", 'w') { |file| file.write(@output) }
  end


  def getformat(emailform)
    format = ""
    case emailform
      when "All Formats" then format = "all"
      when "firstname.lastname@domain" then format = "firstlastdot"
      when "firstinitiallastname@domain" then format = "firstinitiallastname"
      when "firstname_lastname@domain" then format = "firstunderscorelast"
      when "lastnamefirstinitial@domain" then format = "lastnamefirstinitial"
      when "lastname@domain" then format = "justlast"
      else format = nil
    end

    return format
  end
end

