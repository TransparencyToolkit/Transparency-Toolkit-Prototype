json.array!(@plugins) do |plugin|
  json.extract! plugin, :name, :description, :gemname, :method, :step_id
  json.url plugin_url(plugin, format: :json)
end
