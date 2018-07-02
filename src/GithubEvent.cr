require "json"

class GithubEvent
  JSON.mapping(
    type: String,
    created_at: String,
  )
end
