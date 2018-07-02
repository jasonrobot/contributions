require "http/client"
require "json"
require "yaml"

class GithubUser
  YAML.mapping(
    name: String,
    username: String,
  )
end

class GithubEvent
  JSON.mapping(
    type: String,
    created_at: String,
  )
end

def get_user_events( username )
  response_body = HTTP::Client.get( "https://api.github.com/users/#{username}/events" ).body
  Array( GithubEvent ).from_json( response_body )
end

user_list : Array( GithubUser ) = File.open( "users.yml" ) do |file|
  Array( GithubUser ).from_yaml file
end

user_list.each do |user|
  puts "#{user.name}: #{user.username}"
  get_user_events(user.username).select {|event| event.type == "PushEvent" }.each do |event|
    puts "At #{event.created_at} #{user.name} did #{event.type}"
  end
end
