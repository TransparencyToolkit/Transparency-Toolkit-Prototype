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
    ["Word Cloud", "Word cloud tool.", 3],
    ["Upload", "Upload your own documents.", 1],
    ["EFF Scraper", "Scrape EFF case documents.", 1],
    ["ACLU Scraper", "Scrape ACLU case documents.", 1],
    ["Text Extractor", "Extract dates, set terms, or terms in ALLCAPS", 2],
    ["Cables", "Get documents released by WikiLeaks", 1],
    ["Network Graph Generator", "Generate a network graph from any data", 3],
    ["General Scraper", "Scrapes any site for the keywords specified", 1],
    ["UN Vote Records", "UN GA vote record data", 1],
    ["Spy Files", "WikiLeaks Spy Files data", 1],
    ["Archive Websites", "Saves html and pdfs of websites", 1],
    ["Indeed Scraper", "Scrapes Indeed for jobs and resumes", 1],
    ["Pre-Scraped LinkedIn Data", "Pre-scraped LinkedIn data", 1],
    ["Tor Data", "Tor data", 1],
    ["Calculation Tools", "Calculation tools", 2],
    ["Internet User Data", "Total internet users", 1],
    ["Choropleth Map", "Choropleth Map", 3],
    ["Population", "Population of countries over time", 1],
    ["Map", "Generate map with points from dataset", 3],
    ["Name to Email", "Generate names from emails", 2]
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
    ["Scrape LinkedIn", "Get data from public LinkedIn profiles.", 3],
    ["Combine", "Combine multiple datasets.", 4],
    ["Crossreference", "Crossreference datasets.", 5],
    ["Timeline", "Automatically generate a timeline visualization.", 6],
    ["Word Cloud", "Change the size of words in a document based on the number of times they are used.", 7],
    ["Upload", "Upload your own documents.", 8],
    ["EFF Scraper", "Scrape EFF case documents.", 9],
    ["ACLU Scraper", "Scrape ACLU case documents.", 10],
    ["Extract Dates", "Extract dates mentioned in documents.", 11],
    ["WikiLeaks Cables", "Get the WikiLeaks Cables.", 12],
    ["NSA LinkedIn Data", "Pre-scraped data on the NSA and intelligence contractors", 3],
    ["Generate Network Graph", "Generate a network graph from any data", 13],
    ["Scrape Any Website", "Scrapes the site you choose", 14],
    ["Scrape Any Website (Metadata Only)", "Scrapes the site you choose and returns metadata", 14],
    ["Scrape US Gov Site", "Scrapes government site you choose", 14],
    ["Scrape US Gov Site (Metadata Only)", "Scrapes the US gov site you choose and returns metadata", 14],
    ["UN GA Vote Records", "Vote records for the UN General Assembly", 15],
    ["All Targets", "All targets in WL spy files", 16],
    ["Spy Files (Metadata Only)", "Metadata from the Spy Files documents", 16],
    ["Spy Files", "The full spy files documents", 16],
    ["Extract Set Terms", "Extract set terms mentioned in documents.", 11],
    ["Extract ALLCAPS", "Extract ALLCAPS terms mentioned in documents.", 11],
    ["Archive URL", "Archives one URL.", 17],
    ["Archive Multiple URLs", "Archives multiple URLs.", 17],
    ["Scrape Indeed Resumes", "Scrape resumes from Indeed.", 18],
    ["Scrape Indeed Jobs", "Scrape jobs from Indeed.", 18],
    ["Archive Multiple URLs (Full Text)", "Archives multiple URLs with full text.", 17],
    ["Xkeyscore", "XKeyscore", 19],
    ["MARINA", "MARINA", 19],
    ["OCTAVE", "OCTAVE", 19],
    ["ANCHORY", "ANCHORY", 19],
    ["Daytona AT&T", "Daytona AT&T", 19],
    ["Daytona Database", "Daytona Database", 19],
    ["Cymbal AT&T", "Cymbal AT&T", 19],
    ["Tor Users", "Tor Users", 20],
    ["Sum by Attribute", "Sum by Attribute", 21],
    ["Total Internet Users", "Total internet users by country over time", 22],
    ["Choropleth Map (Percents)", "Choropleth map generator", 23],
    ["Tor Servers", "Tor servers", 20],
    ["Choropleth Map", "Choropleth map generator", 23],
    ["Population", "Population over time", 24],
    ["Map with Points", "Plot points on map", 25],
    ["Count Unique Values", "Count values", 21],
    ["Name to Email (Set Domain)", "Generate emails from names", 26], 
    ["Name to Email (Domain from JSON)", "Generate emails from names", 26],
    ["Name to Email (Set Domain, Append to JSON)", "Generate emails from names", 26],
    ["Name to Email (Domain from JSON, Append to JSON)", "Generate emails from names", 26]
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
    ["# of Degrees Out to Scrape", "text_field", false, 10],
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
    ["Second Attribute to Generate Nodes From", "file_field", true, 21],
    ["Site URL", "text_field", true, 22], 
    ["Keywords", "text_field", true, 22],
    ["Site URL", "text_field", true, 23],
    ["Keywords", "text_field", true, 23],
    ["Site URL", "preset_field", true, 24],
    ["Keywords", "text_field", true, 24],
    ["Site URL", "preset_field", true, 25],
    ["Keywords", "text_field", true, 25],
    ["Field to Extract From", "file_field", true, 30],
    ["Terms to Extract", "text_field", true, 30],
    ["Only Return Matches", "check_box", false, 30],
    ["Field to Extract From", "file_field", true, 31],
    ["Terms to Ignore", "text_field", false, 31],
    ["Min # of ALLCAPS Chars in Row", "text_field", true, 31],
    ["Only Return Matches", "check_box", false, 31],
    ["URL to Archive", "text_field", true, 32],
    ["Field with URLs", "file_field", true, 33],
    ["Keyword", "text_field", true, 34],
    ["Location", "text_field", false, 34],
    ["Keyword", "text_field", true, 35],
    ["Location", "text_field", false, 35],
    ["Field with URLs", "file_field", true, 36],
    ["Field to Sum", "file_field", true, 45],
    ["Attribute to Sum By", "file_field", true, 45],
    ["Country Field", "file_field", true, 47],
    ["Percent", "file_field", true, 47],
    ["Country Field", "file_field", true, 49],
    ["Number Field", "file_field", true, 49],
    ["Location Field", "file_field", true, 51],
    ["Picture Field", "file_field", false, 51],
    ["Title Field", "file_field", true, 51],
    ["Start Location", "text_field", true, 51],
    ["Start Zoom", "text_field", true, 51],
    ["Field to Count Unique Values", "file_field", true, 52],
    ["Name Field", "file_field", true, 53],
    ["Domain Name", "text_field", true, 53],
    ["Email Formats", "emailformat_field", true, 53],
    ["Name Field", "file_field", true, 54],
    ["URL Field", "file_field", true, 54],
    ["Email Formats", "emailformat_field", true, 54],
    ["Name Field", "file_field", true, 55],
    ["Domain Name", "text_field", true, 55],
    ["Email Formats", "emailformat_field", true, 55],
    ["Name Field", "file_field", true, 56],
    ["URL Field", "file_field", true, 56],
    ["Email Formats", "emailformat_field", true, 56]
]

plugin_call_field_list.each do |name, field_type, required, plugin_call_id|
  PluginCallField.create(name: name, field_type: field_type, required: required, plugin_call_id: plugin_call_id)
end
