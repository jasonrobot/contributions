require "yaml"

class GithubUser
  YAML.mapping(
    name: String,
    username: String,
  )
end
