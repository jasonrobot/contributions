require "option_parser"

class GithubTrackerOptions
  
  def initialize(@args)
    OptionsParser.parse @args do |parser|
      parser.banner = "Usage: github-tracker [args]"
      parser.on("-s", "--start", "Start time (local)") do |time|
        @start_time = time
      end
      parser.on("-e", "--end", "End time (local)") do |time|
        @end_time = time
      end
    end
    
  end

end
