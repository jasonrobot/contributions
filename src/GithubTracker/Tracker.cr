require "http/client"
require "logger"

require "./GithubUser"
require "./GithubEvent"

# Track events for a github user.
class GithubTracker
  @@default_later : Time = Time.now.to_utc
  @@default_earlier : Time = Time.now.at_beginning_of_day.to_utc
  
  @events = Array(GithubEvent).new
  @repo_names = Hash(Int32, String).new
  @repo_commits = Hash(Int32, Int32).new

  @logger = Logger.new(STDOUT)

  def initialize(@user : String,
                 @earlier : Time = @@default_earlier,
                 @later : Time = @@default_later)
    
    @logger.level = get_log_level
    
    @events = push_events_for_user(@user).select( &.in_date_range @earlier, @later )
    # @events = events_in_date_range(@earlier, @later)

    # select unique events on repo id and make hash of id => name
    @events.uniq( &.repo.id ).each do |event|
      @repo_names[event.repo.id] = event.repo.name
    end

    # count up all the commits per each repo
    @events.map( &.repo.id ).each do |repo_id|
      if @repo_commits[repo_id]?
        @repo_commits[repo_id] += 1
      else
        @repo_commits[repo_id] = 1
      end
    end

    @logger.debug "Tracking from #{@earlier} till #{@later}"
    @logger.debug "#{@events.size} total events"
    @events.each do |event|
      @logger.debug event.time
      @logger.debug event.in_date_range @earlier, @later
    end
      
  end

  getter repo_commits,
         earlier,
         later

  def repo_commits?
    !@repo_commits.empty?
  end

  # Returns a list of events of type "PushEvent" for a given user
  private def push_events_for_user(username : String) : Array(GithubEvent)
    url = "https://api.github.com/users/#{username}/events"
    @logger.debug "#url is #{url}"
    begin
      response_body = HTTP::Client.get(url).body
      Array(GithubEvent).from_json(response_body).select { |event| event.type == "PushEvent" }
    rescue http_ex : Socket::Error
      @logger.fatal "Couldn't get url: #{url}"
      raise http_ex
    rescue json_ex : JSON::ParseException
      @logger.fatal "Couldn't parse JSON response into array."
      @logger.debug response_body
      raise json_ex
    end
  end

  # Get an array of tuples with the repo Id and the count of commits.
  # Useful for printing results.
  def commits_in_repos : Array(Tuple(Int32, Int32))
    Array(Tuple(Int32, Int32)).new do |array|
      @repo_commits.each do |repo_id, commit_count|
        array << {id: repo_id, count: commit_count}
      end
    end
  end

  # Given a REPO_ID, get the name of the repo
  def repo_name(repo_id : Int32) : String
    @repo_names[repo_id]
  end
end
