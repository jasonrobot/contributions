require "json"

# The event object that is returned from the github events API
class GithubEvent

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

  JSON.mapping(
    type: String,
    # format is 2018-07-03T05:25:20Z
    # format is YYYY-MM-DDTHH:MM:SSZ (T and Z are literal)
    time: {
      type:      Time,
      key:       "created_at",
      converter: Time::Format.new("%Y-%m-%dT%H:%M:%SZ", Time::Location::UTC),
      default:   Time.utc_now,
    },
    id: String,
    repo: Repo,
    actor: Actor,
    payload: Payload?,
  )

  def in_date_range(earlier, later) : Bool
    (@time > earlier) && (@time < later)
  end
end
