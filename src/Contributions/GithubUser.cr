require "yaml"

# Represents a github user
class GithubUser
  YAML.mapping(
    name: String,
    username: String,
  )
end
