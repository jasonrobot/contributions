require "./Contributions/GithubTracker"
# Main entry point

# Run the commit counter
def main
  user_list : Array(GithubUser) = File.open("users.yml") do |file|
    Array(GithubUser).from_yaml file
  end

  user_list.each do |user|
    puts "#{user.to_s}: https://github.com/#{user.username}"

    tracker = GithubTracker.new(user.username)

    # push_events_for_user(user.username).each do |event|
    #   commit_count = 0
    #   repo_id = event.repo.id

    #   # smart casts being weird with JSON nilables, gotta cast manually
    #   # its ok because we just need the size anyways
    #   unless event.payload.commits.nil?
    #     commit_count = event.payload.commits.as(Array(JSON::Any)).size
    #   end

    #   if repo.has_key? repo_id
    #     repo[repo_id] += commit_count
    #   else
    #     repo[repo_id] = commit_count
    #   end

    #   unless repo_names.has_key? repo_id
    #     repo_names[repo_id] = event.repo.name
    #   end
    # end

    # tracker.commits_in_repos.each do |repo_id, commit_count|
    #   puts "Pushed #{commit_count} commits to https://github.com/#{repo_names[repo_id]}"
    # end

    tracker.repo_commits.each do |repo_id, commit_count|
      puts "Pushed #{commit_count} commits to https://github.com/#{tracker.repo_name repo_id}"
    end

    puts ""
  end
end

main
