require "json"


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

class Repo
  JSON.mapping(
    id: Int32,
    name: String,
    url: String,
  )
end

class Actor
  JSON.mapping(
    id: Int32,
    login: String,     
  )
end

class Payload
  JSON.mapping(
    commits: {type: Array(JSON::Any), nilable: true}
  )
end
