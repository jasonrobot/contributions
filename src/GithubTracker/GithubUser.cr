require "yaml"

# Represents a github user
#
# name is their personal name to display in the output, and is optional
# username is the name of their github account
class GithubUser
  YAML.mapping(
    name: {type: String, nilable: true},
    username: String,
  )

  def to_s(io : IO)
    unless name.nil?
      io.print @name
    else
      io.print @username
    end
  end
end
