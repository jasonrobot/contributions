require "option_parser"

# A wrapper for OptionParser that main uses to get command line args.
#
# If an option needs main to quit, it can set @quit = true, and main
# should respect that flag.
class GithubTrackerOptions

  getter later_time : Time = Time.now.at_end_of_day.to_utc,
         earlier_time : Time = Time.now.at_beginning_of_day.to_utc,
         user : String = ""
  getter? quit : Bool = false,
          specific_user : Bool = false,
          list_users : Bool = false

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

      parser.on("-u USER", "--user=USER", "Which user to track.") do |username|
        @user = username
        @specific_user = true
      end

      parser.on("--list-users", "List all users in the config file.") do
        @list_users = true
        @quit = true
      end

      parser.on("-h", "--help", "Show this help") do
        puts parser
        @quit = true
      end
    end

  end

end
