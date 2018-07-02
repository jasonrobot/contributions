require "http/client"
require "./Contributions/GithubUser"
require "./Contributions/GithubEvent"

# Returns a list of events of type "PushEvent" for a given user
def push_events_for_user(username : String) : Array(GithubEvent)
  response_body = HTTP::Client.get("https://api.github.com/users/#{username}/events").body
  Array(GithubEvent).from_json(response_body).select { |event| event.type == "PushEvent" }
end

# Run the commit counter
def main
  user_list : Array(GithubUser) = File.open("users.yml") do |file|
    Array(GithubUser).from_yaml file
  end

  user_list.each do |user|
    repo : Hash(Int32, Int32) = Hash(Int32, Int32).new
    repo_names = Hash(Int32, String).new

    username : String = user.name || user.username

    puts "#{user.to_s}: https://github.com/#{user.username}"

    push_events_for_user(user.username).each do |event|
      commit_count = 0
      repo_id = event.repo.id

      # smart casts being weird with JSON nilables, gotta cast manually
      # its ok because we just need the size anyways
      unless event.payload.commits.nil?
        commit_count = event.payload.commits.as(Array(JSON::Any)).size
      end

      if repo.has_key? repo_id
        repo[repo_id] += commit_count
      else
        repo[repo_id] = commit_count
      end

      unless repo_names.has_key? repo_id
        repo_names[repo_id] = event.repo.name
      end
    end

    repo.each do |repo_id, commit_count|
      puts "Pushed #{commit_count} commits to https://github.com/#{repo_names[repo_id]}"
    end

    puts ""
  end
end

main
