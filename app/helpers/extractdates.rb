require 'treat'
include Treat::Core::DSL
require 'date'
require 'json'
require 'american_date'

class ExtractDates
  def initialize(text)
    @text = text
    @output = Array.new
  end
  
  def chunk(file)
    if @text
      begin
        c = @text.chunk
        c.each do |i|
          s = paragraph(i).segment
          #binding.pry
          s.each do |j|
            dateExtract(j, file, j, i)
          end
        end
      rescue
      end
    end
    return @output
  end

  def dateExtract(blob, file, title, description)
    blobstring = blob.to_s
    
    begin
      if blobstring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/)
        save = blobstring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/(\d{1,2})-(\d{1,2})-(\d{2,4})/)
        save = blobstring.match(/(\d{1,2})-(\d{1,2})-(\d{2,4})/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/(.+?)(\w+ \d{1,2}(st|nd|rd|th|), \d{4})/)
        save = blobstring.match(/(.+?)(\w+ \d{1,2}(st|nd|rd|th|), \d{4})/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/(.+?) ((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Nov(?:ember)?|Dec(?:ember)?) \d{2}(st|nd|rd|th|)( |\)|\]))/)
        save = blobstring.match(/(.+?) ((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Nov(?:ember)?|Dec(?:ember)?) \d{2}(st|nd|rd|th|)( |\)|\]))/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Nov(?:ember)?|Dec(?:ember)?) [1-2][0,9]\d{2}( |\)|\]))/)
        save = blobstring.match(/((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Nov(?:ember)?|Dec(?:ember)?) [1-2][0,9]\d{2}( |\)|\]))/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/(\d{4})-(\d{2})-(\d{2})/)
        save = blobstring.match(/(\d{4})-(\d{2})-(\d{2})/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      elsif blobstring.match(/(\d{4})\/(\d{2})\/(\d{2})/)
        save = blobstring.match(/(\d{4})\/(\d{2})\/(\d{2})/)
        addItem(DateTime.parse(blob).to_s, file, title, description, blobstring, save.to_s)
      end
    rescue
    end
  end

  # Adds and item to the hash
  def addItem(date, file, title, description, blob, regex)
    shash = Hash.new
    shash[:date] = date
    shash[:file] = file
    shash[:title] = title
    shash[:description] = description

    flag = 0
    @output.each do |o|
      if (o[:date] == shash[:date]) && (o[:file] == shash[:file]) && (o[:title].to_s == shash[:title].to_s)
        flag = 1
        break
      end
    end

    if flag == 0
      @output.push(shash)
    end

    blob.slice! regex
    dateExtract(blob, file, title, description)
  end
end

