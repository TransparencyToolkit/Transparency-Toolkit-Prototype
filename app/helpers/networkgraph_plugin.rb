class NetworkgraphPlugin < PluginClass
  public
  def initialize(method, input=nil, stepnum, previous)
    @method = method
    @input = input
    @stepnum = stepnum
    @output = nil
    @previous = previous
  end

  def switch
    case @method
      when 21 then gennetwork
      else "Unknown Method"
    end
  end
  
  def gennetwork
    n = JSONToNetworkGraph.new(@previous, @input["First Attribute to Generate Nodes From"], @input["First Attribute to Generate Nodes From"], @input["Second Attribute to Generate Nodes From"], @input["Second Attribute to Generate Nodes From"])
    @output = n.genJSON
  end
end

