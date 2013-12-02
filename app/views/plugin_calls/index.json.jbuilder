json.array!(@plugin_calls) do |plugin_call|
  json.extract! plugin_call, :call, :details, :what, :plugin_id
  json.url plugin_call_url(plugin_call, format: :json)
end
