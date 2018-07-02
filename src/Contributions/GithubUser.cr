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
    if name.nil?
      io.print @username
    else
      io.print @name
    end
  end
end
