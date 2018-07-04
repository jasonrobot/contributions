require "http/client"
require "./GithubUser"
require "./GithubEvent"

# Track events for a github user.
class GithubTracker
  @@default_start_time : Time = Time.utc_now
  @@default_end_time : Time = Time.utc_now - Time::Span.new(hours: 24, minutes: 0, seconds: 0)
  @events : Array(GithubEvent)
  @repo_names : Hash(Int32, String)
  
  def initialize(@user : String,
                 @start_time : Time = @@default_start_time,
                 @end_time : Time = @@default_end_time)
    @events = push_events_for_user(@user)
    # select unique events on repo id and make hash of id => name
    @repo_names = Hash(Int32, String).new
    
    @events.uniq { |e| e.repo.id }.each do |event|
      @repo_names[event.repo.id] = event.repo.name
    end

    @repo_commits = Hash(Int32, Int32).new
    @events.map { |e| e.repo.id }.each do |repo_id|
      if @repo_commits[repo_id]?
        @repo_commits[repo_id] += 1
      else
        @repo_commits[repo_id] = 1
      end
    end
  end

  getter repo_commits

  # def self.new(user : GithubUser, start_time : Time)
  #   new(user, start_time, @end_time)
  # end
  
  # def self.new(user : GithubUser)
  #   new(user, start_time, end_time)
  # end

  # Returns a list of events of type "PushEvent" for a given user
  private def push_events_for_user(username : String) : Array(GithubEvent)
    response_body = HTTP::Client.get("https://api.github.com/users/#{username}/events").body
    Array(GithubEvent).from_json(response_body).select { |event| event.type == "PushEvent" }
  end

  # Filter events in a Time range, inclusive.
  def events_in_date_range(from : Time, to : Time) : Array(GithubEvent)
    @events.select do |event|
      event.time >= from && event.time <= to
    end
  end

  def commits_in_repos : Array(Tuple(Int32, Int32))
    Array(Tuple(Int32, Int32)).new do |array|
      @repo_commits.each do |repo_id, commit_count|
        array << {id: repo_id, count: commit_count}
      end
    end
  end
  
  def repo_name(repo_id : Int32) : String
    @repo_names[repo_id]
  end
end
