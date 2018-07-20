require "logger"

require "./GithubTracker/Tracker"
require "./GithubTrackerOptions"

# Main entry point

# users_file_paths = %w(users.yml ~/.config/github-tracker/users.yml)

# Gets the LOG_LEVEL env var, or returns level WARN
macro get_log_level
  begin
    Logger::Severity.parse ENV["LOG_LEVEL"]
  rescue
    Logger::WARN
  end
end

# Loads the users yaml file, or raises an exception to crash the app.
def get_users_file : String
  users_file_paths = [
    "users.yml",
    "~/.config/github-tracker/users.yml",
    "users.yaml",
    "~/.config/github-tracker/users.yaml",
  ].map { |path| File.expand_path path }
  
  users_file_paths.select do |path|
    path if File.exists?(path)
  end[0]? ||
    raise "Users file not found: " + users_file_paths.reduce { |a, b| a + " " + b }
end

# Parses the users yaml file into an array of GithubUser
def load_user_list : Array(GithubUser)
  File.open(get_users_file) do |file|
    Array(GithubUser).from_yaml file
  end
end

# Run the commit counter
def main()

  options = GithubTrackerOptions.new ARGV
  
  user_list : Array(GithubUser) = load_user_list.shuffle

  later_time = options.later_time
  earlier_time = options.earlier_time

  puts ""
  puts "From #{earlier_time} till #{later_time}"
  puts ""

  user_list.each do |user|
    puts "#{user.to_s}: https://github.com/#{user.username}"

    tracker = GithubTracker.new(user.username, earlier_time, later_time)

    if tracker.repo_commits?
      tracker.repo_commits.each do |repo_id, commit_count|
        puts "Pushed #{commit_count} commits to https://github.com/#{tracker.repo_name repo_id}"
      end
    else
      puts "No commits today!"
    end

    puts ""
  end
end

main
