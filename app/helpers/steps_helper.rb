$pluginhash = Hash.new

module StepsHelper
def switch(usedplugin, usedmethod, input=nil, stepnum)
  if input == {}
    input = $pluginhash[stepnum-1].output
  end

  if usedplugin == 2
    $pluginhash[stepnum] = TimelinegenPlugin.new(usedmethod, input, stepnum)
    $pluginhash[stepnum].switch
    render :partial => 'timelinegen', :locals => { :output => $pluginhash[stepnum].output }
  elsif usedplugin == 3
    $pluginhash[stepnum] = TimelinejsPlugin.new(usedmethod, input, stepnum)
    $pluginhash[stepnum].switch
    render :partial => 'emailtimeline', :locals => { :output => $pluginhash[stepnum].output }
  end
end
end
