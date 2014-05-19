# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




plugin_call_list = [
    ["All Actions of Legislator", "Gets all the votes, bills sponsored, mentions, and other actions for a particular legislator in US congress.",  "Get"],
    ["Votes", "Gets all the votes for a particular legislator.", "Get"],
    ["Amendments", "Gets all the amendments proposed by a particular legislator.", "Get"],
    ["Bills", "Gets all the bills sponsored by a particular legislator.",  "Get"],
    ["Updates", "Gets all updates from congress mentioning a legislator.",  "Get"],
    ["Committees", "Get a list of committees a particular legislator is on.",  "Get"],
    ["Hearings", "Get a list of all hearings for a committee.", "Get"],
    ["Hearings for Committees", "Get a list of all hearings for a list of committees.",  "Get"],
    ["Political Fundraising Parties", "Get a list of all parties a legislator attended.", "Get"],
    ["Scrape LinkedIn", "Get data from public LinkedIn profiles.",  "Get"],
    ["Combine", "Combine multiple datasets.", "Combine"],
    ["Crossreference", "Crossreference datasets.", "Combine"],
    ["Timeline", "Automatically generate a timeline visualization.",  "Visualize"],
    ["Word Cloud", "Change the size of words in a document based on the number of times they are used.",  "Visualize"],
    ["Upload", "Upload your own documents.", "Get"],
    ["EFF Scraper", "Scrape EFF case documents.", "Get"],
    ["ACLU Scraper", "Scrape ACLU case documents.",  "Get"],
    ["Extract Dates", "Extract dates mentioned in documents.", "Get"],
    ["WikiLeaks Cables", "Get the WikiLeaks Cables.",  "Get"],
    ["NSA LinkedIn Data", "Pre-scraped data on the NSA and intelligence contractors", "Get"],
    ["Generate Network Graph", "Generate a network graph from any data", "Visualize"]
]

plugin_call_list.each do |what, details, category|
  PluginCall.create(what: what, details: details, category: category)
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
    ["Input Text", "text_area", true, 14],
    ["File to Upload", "upload_field", true, 15],
    ["URL of EFF Case", "text_field", true, 16],
    ["URL of ACLU Case", "text_field", true, 17],
    ["Field to Extract From", "file_field", true, 18],
    ["Terms to Search for in Cables", "text_field", true, 19],
    ["First Attribute to Generate Nodes From", "file_field", true, 21],
    ["Second Attribute to Generate Nodes From", "file_field", true, 21]
]

plugin_call_field_list.each do |name, field_type, required, plugin_call_id|
  PluginCallField.create(name: name, field_type: field_type, required: required, plugin_call_id: plugin_call_id)
end
