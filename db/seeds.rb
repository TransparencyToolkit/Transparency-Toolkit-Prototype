# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

category_list = [
    "Get Data",
    "Combine Data",
    "Visualize Data"
]

category_list.each do |type|
  Category.create(type: type)
end


plugin_list = [
    ["US Congress", "Sunlight Foundation's data on votes, bills sponsored, and other actions in congress.", 1],
    ["Political Fundraising Parties", "Sunlight Foundation's data on political fundraising parties for congresspeople.", 1],
    ["LinkedIn", "Get data from public LinkedIn profiles.", 1],
    ["Combine", "Combine multiple datasets.", 2],
    ["Crossreference", "Crossreference datasets.", 2],
    ["Timeline", "Automatically generate a timeline visualization.", 3],
    ["Word Cloud", "Change the size of words in a document based on the number of times they are used.", 3]
]

plugin_list.each do |name, description, category_id|
  Plugin.create(name: name, description: description, category_id: category_id)
end


plugin_call_list = [
    ["All Actions of Legislator", "Gets all the votes, bills sponsored, mentions, and other actions for a particular legislator in US congress.", 1],
    ["Votes", "Gets all the votes for a particular legislator.", 1],
    ["Amendments", "Gets all the amendments proposed by a particular legislator.", 1],
    ["Bills", "Gets all the bills sponsored by a particular legislator.", 1],
    ["Updates", "Gets all updates from congress mentioning a legislator.", 1],
    ["Committees", "Get a list of committees a particular legislator is on.", 1],
    ["Hearings", "Get a list of all hearings for a committee.", 1],
    ["Hearings for Committees", "Get a list of all hearings for a list of committees.", 1],
    ["Political Fundraising Parties", "Get a list of all parties a legislator attended.", 2],
    ["LinkedIn", "Get data from public LinkedIn profiles.", 3],
    ["Combine", "Combine multiple datasets.", 4],
    ["Crossreference", "Crossreference datasets.", 5],
    ["Timeline", "Automatically generate a timeline visualization.", 6],
    ["Word Cloud", "Change the size of words in a document based on the number of times they are used.", 7]
]

plugin_call_list.each do |what, details, plugin_id|
  PluginCall.create(what: what, details: details, plugin_id: plugin_id)
end


plugin_call_field_list = [
    ["Legislator Name", "text_field", true, 1],
    ["Legislator Name", "text_field", true, 2],
    ["Legislator Name", "text_field", true, 3],
    ["Legislator Name", "text_field", true, 4],
    ["Legislator Name", "text_field", true, 5],
    ["Legislator Name", "text_field", true, 6],
    ["Committee ID", "text_field", true, 7],
    ["Legislator Name", "text_field", true, 9],
    ["Search Terms", "text_field", true, 10],
    ["First Dataset to Combine", "step_field", true, 11],
    ["Second Dataset to Combine", "step_field", true, 11],
    ["First Dataset to Crossreference", "step_field", true, 12],
    ["Field to Crossreference in First Dataset", "file_field", true, 12],
    ["Second Dataset to Crossreference", "step_field", true, 12],
    ["Field to Crossreference in Second Dataset", "file_field", true, 12],
    ["Timeline Title", "text_field", false, 13],
    ["Field for Start Date", "file_field", true, 13],
    ["Field for End Date", "file_field", true, 13],
    ["Field for Headline", "file_field", true, 13],
    ["Field for Text", "file_field", true, 13],
    ["Input Text", "text_area", true, 14]
]

plugin_call_field_list.each do |name, field_type, required, plugin_call_id|
  PluginCallField.create(name: name, field_type: field_type, required: required, plugin_call_id: plugin_call_id)
end