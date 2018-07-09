require "http/client"
require "logger"

require "./GithubUser"
require "./GithubEvent"

# Track events for a github user.
class GithubTracker
  @@default_newest : Time = Time.utc_now
  @@default_oldest : Time = Time.utc_now - Time::Span.new(hours: 24, minutes: 0, seconds: 0)
  @events = Array(GithubEvent).new
  @repo_names = Hash(Int32, String).new
  @repo_commits = Hash(Int32, Int32).new

  @logger = Logger.new(STDOUT)

  def initialize(@user : String,
                 @newest : Time = @@default_newest,
                 @oldest : Time = @@default_oldest)
    
    @logger.level = get_log_level
    
    @events = push_events_for_user(@user).select( &.in_date_range @newest, @oldest )
    # @events = events_in_date_range(@newest, @oldest)

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

    @logger.debug "Tracking from #{@newest} till #{@oldest}"
    @events.each do |event|
      @logger.debug event.time
      @logger.debug event.in_date_range @newest, @oldest
    end
      
  end

  getter repo_commits,
         newest,
         oldest
  
  # Returns a list of events of type "PushEvent" for a given user
  private def push_events_for_user(username : String) : Array(GithubEvent)
    response_body = HTTP::Client.get("https://api.github.com/users/#{username}/events").body
    Array(GithubEvent).from_json(response_body).select { |event| event.type == "PushEvent" }
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
