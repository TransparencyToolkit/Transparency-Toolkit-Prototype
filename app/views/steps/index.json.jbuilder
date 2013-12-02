json.array!(@steps) do |step|
  json.extract! step, :name, :description, :number, :usedplugin, :usedcall
  json.url step_url(step, format: :json)
end
