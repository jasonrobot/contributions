require "http/client"
require "./Contributions/GithubUser"
require "./Contributions/GithubEvent"


def get_user_events( username )
  response_body = HTTP::Client.get( "https://api.github.com/users/#{username}/events" ).body
  Array( GithubEvent ).from_json( response_body )
end

def main
  user_list : Array( GithubUser ) = File.open( "users.yml" ) do |file|
    Array( GithubUser ).from_yaml file
  end

  user_list.each do |user|
    puts "#{user.name}: #{user.username}"
    get_user_events(user.username).select {|event| event.type == "PushEvent" }.each do |event|
      puts "At #{event.created_at} #{user.name} did #{event.type}"
      
      # smart casts being weird with JSON nilables, gotta cast manually
      # its ok because we just need the size anyways
      unless event.payload.commits.nil?
        puts event.payload.commits.as(Array(JSON::Any)).size
      end
    end
  end
end

main
