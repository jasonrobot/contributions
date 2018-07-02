require "json"

# The repo object that is passed back in the event object
class Repo
  JSON.mapping(
    id: Int32,
    name: String,
    url: String,
  )
end

# The actor object that is passed back in the event object
class Actor
  JSON.mapping(
    id: Int32,
    login: String,
  )
end

# The payload object that is passed back in the event object
class Payload
  JSON.mapping(
    commits: {type: Array(JSON::Any), nilable: true}
  )
end

# The event object that is returned from the github events API
class GithubEvent
  JSON.mapping(
    type: String,
    created_at: String,
    id: String,
    repo: Repo,
    actor: Actor,
    payload: {type: Payload, nilable: false},
  )
end
