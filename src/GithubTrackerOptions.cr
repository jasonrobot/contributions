require "option_parser"

class GithubTrackerOptions
  @later_time : Time = Time.now.at_end_of_day.to_utc
  @earlier_time : Time = Time.now.at_beginning_of_day.to_utc

  @format : Time::Format = Time::Format.new("%Y-%m-%dT%H:%M:%SZ", Time::Location.local)
  
  def initialize(args)
    OptionParser.parse args do |parser|
      parser.banner = "Usage: github-tracker [args]"
      parser.on("-s", "--start", "Time to begin tracking from (local)") do |time|
        @earlier_time = @format.parse time
      end
      parser.on("-e", "--end", "End time (local)") do |time|
        @later_time = @format.parse time
      end
      parser.on("-d DAYS", "--days-ago=DAYS", "How many days ago to track from.") do |days_arg|
        puts days_arg
        days = days_arg.to_i
        span = Time::Span.new(days: days, hours: 0, minutes: 0, seconds: 0)
        @later_time = @later_time - span
        @earlier_time = @earlier_time - span
      end
    end
    
  end

  getter later_time, earlier_time

end
