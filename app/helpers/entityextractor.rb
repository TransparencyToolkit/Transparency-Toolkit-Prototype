require 'json'
load 'extractdates.rb'
require 'uploadconvert'

class EntityExtractor
  def initialize(input, *extractfield)
    @input = JSON.parse(input)
    @extractfield = *extractfield
    @output = Array.new
  end

  # Extract terms input from preset list
  def extractTerms(*terms, i, addlist, field)
    count = 0
      
    # Check the item for each term
    terms.each do |t|
      count+=1
   
      if i[field].to_s.include? t
        addlist.push(t.upcase)
      end
    end
  end

  # Parses terms in all caps
  def parseALLCAPS(toParse, i, minchar, addlist, ignoreterms, savefield, extractfield)
    if toParse =~ (/[A-Z]{#{minchar}}/)
      index = toParse =~ (/[A-Z]{#{minchar}}/)
      charnum = 0
      
      # Find word in all caps
      toParse.each_char do |c|
        if charnum >= index
          if toParse[c] == toParse[c].upcase && toParse[c] !~ (/[[:punct:]]/) && toParse[c] !~ (/[[:digit:]]/)
            charnum += 1
          else break
          end
        else
          charnum += 1
        end
      end

      # Remove any extra characters
      if toParse[charnum-2] == " "
        charnum = charnum-3
      elsif toParse[charnum-1] == " "
        charnum = charnum-2
      else charnum = charnum-1
      end
      
      # Filter out terms in ignoreterms array
      if !(ignoreterms.include? toParse[index..charnum])
        addlist.push(toParse[index..charnum])
      end
      
      parsedstring = toParse[0..charnum]
      toParse.slice! parsedstring
      parseALLCAPS(toParse, i, minchar, addlist, ignoreterms, savefield, extractfield)

    # If there are no (more) results, append addlist to JSON
    else
      i[extractfield] = savefield
    end
  end

  # Get list of just extracted terms by occurrence
  def getExtract
    extracthash = Hash.new
    
    # Generate hash of all extracted terms
    @output.each do |i|
      i["extract"].each do |e|
        if extracthash.has_key? e
          extracthash[e] += 1
        else
          extracthash[e] = 1
        end
      end
    end
    
    # Sort hash
    return Hash[extracthash.sort_by { |k, v| v}]
  end

  # Generates JSON output
  def genJSON
    JSON.pretty_generate(@output)
  end

  def extract(type, minchar, ignoreterms, *terms)
    flag = 0
    @input.each do |i|
      if i.length == 2
        i = @input
        flag = 1
      end

      addlist = Array.new
      
      # Generate set terms list
      if type == "set"
        @extractfield.each do |f|
          extractTerms(*terms, i, addlist, f)
        end

        i["extract"] = addlist
        @output.push(i)
      
      # Generate ALLCAPS terms list
      elsif type == "ALLCAPS"
        @extractfield.each do |f|
          savefield = i[f].to_s + " "
          parseALLCAPS(i[f].to_s, i, minchar, addlist, ignoreterms, savefield, f)
        end
        
        i["extract"] = addlist
        @output.push(i)

      # Extract dates
      elsif type == "date"
        @extractfield.each do |f|
          d = ExtractDates.new(i[f])
          if i["path"]
            outhash = d.chunk(i["path"])
          else
            outhash = d.chunk(i["input"])
          end
          @output.push(outhash)
        end

      # Extract both set terms and ALLCAPS
      elsif type == "both"
        @extractfield.each do |f|
          savefield = i[f].to_s + " "
          parseALLCAPS(i[f].to_s, i, minchar, addlist, ignoreterms, savefield, f)
          extractTerms(*terms, i, addlist, f)
        end

        i["extract"] = addlist
        @output.push(i)
      end

      if flag == 1
        break
      end
    end 
 end
end

#u = UploadConvert.new("test.pdf")
#d = EntityExtractor.new(u.handleDoc, "text")
#save = d.extract("date", nil, nil, nil)
#puts d.genJSON
