json.array!(@plugin_call_fields) do |plugin_call_field|
  json.extract! plugin_call_field, 
  json.url plugin_call_field_url(plugin_call_field, format: :json)
end
