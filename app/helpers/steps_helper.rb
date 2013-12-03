$pluginhash = Hash.new

module StepsHelper
def switch(usedplugin, usedmethod, input=nil, stepnum)
  # input ||= $pluginhash[stepnum-1].output add once input processing works
  if usedplugin == 2
    $pluginhash[stepnum] = TimelinegenPlugin.new(usedmethod, input, stepnum)
    $pluginhash[stepnum].switch
    render :partial => 'timelinegen', :locals => { :output => $pluginhash[stepnum].output }
  elsif usedplugin == 3
    $pluginhash[stepnum] = TimelinejsPlugin.new(usedmethod, $pluginhash[stepnum-1].output, stepnum) #change with input processing
    $pluginhash[stepnum].switch
    render :partial => 'emailtimeline', :locals => { :output => $pluginhash[stepnum].output }
  end
end
end
