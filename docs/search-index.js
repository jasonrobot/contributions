crystal_doc_search_index_callback({"repository_name":"github.com/jasonrobot/contributions","body":"# Commit Tracker\n\nA simple project for tracking commits per day based on a list of users\n\nModify `users.yml` with a list of users you want to track.\n\nTracks number of PushEvents with commits for the current day.\nThis is similar to the contributions graph GitHub provides, but there may be some differences in how they are counted. \n\nThis is a rewrite in the Crystal language. This way it will get more upvotes on Reddit and HackerNews. Mostly though, I was just wanting to play with Crystal again and didnt put in the effort to make my own project.\n\n[Documentation is hosted here!](https://jasonrobot.github.io/contributions/)\n","program":{"html_id":"github.com/jasonrobot/contributions/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"github.com/jasonrobot/contributions","program":true,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[{"id":"main-class-method","html_id":"main-class-method","name":"main","doc":"Run the commit counter","summary":"<p>Run the commit counter</p>","abstract":false,"args":[],"args_string":"","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/contributions.cr#L12","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/contributions.cr#L12","def":{"name":"main","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"user_list : Array(GithubUser) = File.open(\"users.yml\") do |file|\n  Array(GithubUser).from_yaml(file)\nend\nuser_list.each do |user|\n  repo : Hash(Int32, Int32) = Hash(Int32, Int32).new\n  repo_names = Hash(Int32, String).new\n  username : String = user.name || user.username\n  puts(\"#{user.to_s}: https://github.com/#{user.username}\")\n  (push_events_for_user(user.username)).each do |event|\n    commit_count = 0\n    repo_id = event.repo.id\n    if event.payload.commits.nil?\n    else\n      commit_count = (event.payload.commits.as(Array(JSON::Any))).size\n    end\n    if repo.has_key?(repo_id)\n      __temp_23 = repo_id\n      repo[__temp_23] = repo[__temp_23] + commit_count\n    else\n      repo[repo_id] = commit_count\n    end\n    if repo_names.has_key?(repo_id)\n    else\n      repo_names[repo_id] = event.repo.name\n    end\n  end\n  repo.each do |repo_id, commit_count|\n    puts(\"Pushed #{commit_count} commits to https://github.com/#{repo_names[repo_id]}\")\n  end\n  puts(\"\")\nend\n"}},{"id":"push_events_for_user(username:String):Array(GithubEvent)-class-method","html_id":"push_events_for_user(username:String):Array(GithubEvent)-class-method","name":"push_events_for_user","doc":"Returns a list of events of type \"PushEvent\" for a given user","summary":"<p>Returns a list of events of type \"PushEvent\" for a given user</p>","abstract":false,"args":[{"name":"username","doc":null,"default_value":"","external_name":"username","restriction":"String"}],"args_string":"(username : String) : Array(GithubEvent)","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/contributions.cr#L6","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/contributions.cr#L6","def":{"name":"push_events_for_user","args":[{"name":"username","doc":null,"default_value":"","external_name":"username","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(GithubEvent)","visibility":"Public","body":"response_body = (HTTP::Client.get(\"https://api.github.com/users/#{username}/events\")).body\n(Array(GithubEvent).from_json(response_body)).select do |event|\n  event.type == \"PushEvent\"\nend\n"}}],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"github.com/jasonrobot/contributions/Actor","path":"Actor.html","kind":"class","full_name":"Actor","name":"Actor","abstract":false,"superclass":{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/jasonrobot/contributions/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"Contributions/GithubEvent.cr","line_number":13,"url":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubEvent.cr"}],"repository_name":"github.com/jasonrobot/contributions","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"The actor object that is passed back in the event object","summary":"<p>The actor object that is passed back in the event object</p>","class_methods":[],"constructors":[{"id":"new(__temp_52:JSON::PullParser)-class-method","html_id":"new(__temp_52:JSON::PullParser)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"__temp_52","doc":null,"default_value":"","external_name":"__temp_52","restriction":"::JSON::PullParser"}],"args_string":"(__temp_52 : JSON::PullParser)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"__temp_52","doc":null,"default_value":"","external_name":"__temp_52","restriction":"::JSON::PullParser"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(__temp_52)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"id:Int32-instance-method","html_id":"id:Int32-instance-method","name":"id","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Int32","source_link":null,"source_link":null,"def":{"name":"id","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Int32","visibility":"Public","body":"@id"}},{"id":"id=(_id:Int32)-instance-method","html_id":"id=(_id:Int32)-instance-method","name":"id=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"Int32"}],"args_string":"(_id : Int32)","source_link":null,"source_link":null,"def":{"name":"id=","args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"Int32"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@id = _id"}},{"id":"login:String-instance-method","html_id":"login:String-instance-method","name":"login","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"login","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@login"}},{"id":"login=(_login:String)-instance-method","html_id":"login=(_login:String)-instance-method","name":"login=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_login","doc":null,"default_value":"","external_name":"_login","restriction":"String"}],"args_string":"(_login : String)","source_link":null,"source_link":null,"def":{"name":"login=","args":[{"name":"_login","doc":null,"default_value":"","external_name":"_login","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@login = _login"}},{"id":"to_json(json:JSON::Builder)-instance-method","html_id":"to_json(json:JSON::Builder)-instance-method","name":"to_json","doc":null,"summary":null,"abstract":false,"args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"args_string":"(json : JSON::Builder)","source_link":null,"source_link":null,"def":{"name":"to_json","args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"json.object do\n  _id = @id\n  if _id.nil?\n  else\n    json.field(\"id\") do\n      _id.to_json(json)\n    end\n  end\n  _login = @login\n  if _login.nil?\n  else\n    json.field(\"login\") do\n      _login.to_json(json)\n    end\n  end\nend"}}],"macros":[],"types":[]},{"html_id":"github.com/jasonrobot/contributions/GithubEvent","path":"GithubEvent.html","kind":"class","full_name":"GithubEvent","name":"GithubEvent","abstract":false,"superclass":{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/jasonrobot/contributions/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"Contributions/GithubEvent.cr","line_number":28,"url":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubEvent.cr"}],"repository_name":"github.com/jasonrobot/contributions","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"The event object that is returned from the github events API","summary":"<p>The event object that is returned from the github events API</p>","class_methods":[],"constructors":[{"id":"new(__temp_64:JSON::PullParser)-class-method","html_id":"new(__temp_64:JSON::PullParser)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"__temp_64","doc":null,"default_value":"","external_name":"__temp_64","restriction":"::JSON::PullParser"}],"args_string":"(__temp_64 : JSON::PullParser)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"__temp_64","doc":null,"default_value":"","external_name":"__temp_64","restriction":"::JSON::PullParser"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(__temp_64)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"actor:Actor-instance-method","html_id":"actor:Actor-instance-method","name":"actor","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Actor","source_link":null,"source_link":null,"def":{"name":"actor","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Actor","visibility":"Public","body":"@actor"}},{"id":"actor=(_actor:Actor)-instance-method","html_id":"actor=(_actor:Actor)-instance-method","name":"actor=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_actor","doc":null,"default_value":"","external_name":"_actor","restriction":"Actor"}],"args_string":"(_actor : Actor)","source_link":null,"source_link":null,"def":{"name":"actor=","args":[{"name":"_actor","doc":null,"default_value":"","external_name":"_actor","restriction":"Actor"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@actor = _actor"}},{"id":"created_at:String-instance-method","html_id":"created_at:String-instance-method","name":"created_at","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"created_at","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@created_at"}},{"id":"created_at=(_created_at:String)-instance-method","html_id":"created_at=(_created_at:String)-instance-method","name":"created_at=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_created_at","doc":null,"default_value":"","external_name":"_created_at","restriction":"String"}],"args_string":"(_created_at : String)","source_link":null,"source_link":null,"def":{"name":"created_at=","args":[{"name":"_created_at","doc":null,"default_value":"","external_name":"_created_at","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@created_at = _created_at"}},{"id":"id:String-instance-method","html_id":"id:String-instance-method","name":"id","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"id","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@id"}},{"id":"id=(_id:String)-instance-method","html_id":"id=(_id:String)-instance-method","name":"id=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"String"}],"args_string":"(_id : String)","source_link":null,"source_link":null,"def":{"name":"id=","args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@id = _id"}},{"id":"payload:Payload-instance-method","html_id":"payload:Payload-instance-method","name":"payload","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Payload","source_link":null,"source_link":null,"def":{"name":"payload","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Payload","visibility":"Public","body":"@payload"}},{"id":"payload=(_payload:Payload)-instance-method","html_id":"payload=(_payload:Payload)-instance-method","name":"payload=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_payload","doc":null,"default_value":"","external_name":"_payload","restriction":"Payload"}],"args_string":"(_payload : Payload)","source_link":null,"source_link":null,"def":{"name":"payload=","args":[{"name":"_payload","doc":null,"default_value":"","external_name":"_payload","restriction":"Payload"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@payload = _payload"}},{"id":"repo:Repo-instance-method","html_id":"repo:Repo-instance-method","name":"repo","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Repo","source_link":null,"source_link":null,"def":{"name":"repo","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Repo","visibility":"Public","body":"@repo"}},{"id":"repo=(_repo:Repo)-instance-method","html_id":"repo=(_repo:Repo)-instance-method","name":"repo=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_repo","doc":null,"default_value":"","external_name":"_repo","restriction":"Repo"}],"args_string":"(_repo : Repo)","source_link":null,"source_link":null,"def":{"name":"repo=","args":[{"name":"_repo","doc":null,"default_value":"","external_name":"_repo","restriction":"Repo"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@repo = _repo"}},{"id":"to_json(json:JSON::Builder)-instance-method","html_id":"to_json(json:JSON::Builder)-instance-method","name":"to_json","doc":null,"summary":null,"abstract":false,"args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"args_string":"(json : JSON::Builder)","source_link":null,"source_link":null,"def":{"name":"to_json","args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"json.object do\n  _type = @type\n  if _type.nil?\n  else\n    json.field(\"type\") do\n      _type.to_json(json)\n    end\n  end\n  _created_at = @created_at\n  if _created_at.nil?\n  else\n    json.field(\"created_at\") do\n      _created_at.to_json(json)\n    end\n  end\n  _id = @id\n  if _id.nil?\n  else\n    json.field(\"id\") do\n      _id.to_json(json)\n    end\n  end\n  _repo = @repo\n  if _repo.nil?\n  else\n    json.field(\"repo\") do\n      _repo.to_json(json)\n    end\n  end\n  _actor = @actor\n  if _actor.nil?\n  else\n    json.field(\"actor\") do\n      _actor.to_json(json)\n    end\n  end\n  _payload = @payload\n  if _payload.nil?\n  else\n    json.field(\"payload\") do\n      _payload.to_json(json)\n    end\n  end\nend"}},{"id":"type:String-instance-method","html_id":"type:String-instance-method","name":"type","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"type","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@type"}},{"id":"type=(_type:String)-instance-method","html_id":"type=(_type:String)-instance-method","name":"type=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_type","doc":null,"default_value":"","external_name":"_type","restriction":"String"}],"args_string":"(_type : String)","source_link":null,"source_link":null,"def":{"name":"type=","args":[{"name":"_type","doc":null,"default_value":"","external_name":"_type","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@type = _type"}}],"macros":[],"types":[]},{"html_id":"github.com/jasonrobot/contributions/GithubUser","path":"GithubUser.html","kind":"class","full_name":"GithubUser","name":"GithubUser","abstract":false,"superclass":{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/jasonrobot/contributions/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"Contributions/GithubUser.cr","line_number":7,"url":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubUser.cr"}],"repository_name":"github.com/jasonrobot/contributions","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"Represents a github user\n\nname is their personal name to display in the output, and is optional\nusername is the name of their github account","summary":"<p>Represents a github user</p>","class_methods":[],"constructors":[{"id":"new(ctx:YAML::ParseContext,node:YAML::Nodes::Node,_dummy:Nil)-class-method","html_id":"new(ctx:YAML::ParseContext,node:YAML::Nodes::Node,_dummy:Nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"ctx","doc":null,"default_value":"","external_name":"ctx","restriction":"YAML::ParseContext"},{"name":"node","doc":null,"default_value":"","external_name":"node","restriction":"::YAML::Nodes::Node"},{"name":"_dummy","doc":null,"default_value":"","external_name":"_dummy","restriction":"Nil"}],"args_string":"(ctx : YAML::ParseContext, node : YAML::Nodes::Node, _dummy : Nil)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"ctx","doc":null,"default_value":"","external_name":"ctx","restriction":"YAML::ParseContext"},{"name":"node","doc":null,"default_value":"","external_name":"node","restriction":"::YAML::Nodes::Node"},{"name":"_dummy","doc":null,"default_value":"","external_name":"_dummy","restriction":"Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(ctx, node, _dummy)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(ctx:YAML::ParseContext,node:YAML::Nodes::Node)-class-method","html_id":"new(ctx:YAML::ParseContext,node:YAML::Nodes::Node)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"ctx","doc":null,"default_value":"","external_name":"ctx","restriction":"YAML::ParseContext"},{"name":"node","doc":null,"default_value":"","external_name":"node","restriction":"YAML::Nodes::Node"}],"args_string":"(ctx : YAML::ParseContext, node : YAML::Nodes::Node)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"ctx","doc":null,"default_value":"","external_name":"ctx","restriction":"YAML::ParseContext"},{"name":"node","doc":null,"default_value":"","external_name":"node","restriction":"YAML::Nodes::Node"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"ctx.read_alias(node, {{ @type }}) do |obj|\n  return obj\nend\ninstance = allocate\nctx.record_anchor(node, instance)\ninstance.initialize(ctx, node, nil)\nif instance.responds_to?(:finalize)\n  GC.add_finalizer(instance)\nend\ninstance\n"}}],"instance_methods":[{"id":"name:String?-instance-method","html_id":"name:String?-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String?","source_link":null,"source_link":null,"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@name"}},{"id":"name=(_name:String?)-instance-method","html_id":"name=(_name:String?)-instance-method","name":"name=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"String | ::Nil"}],"args_string":"(_name : String?)","source_link":null,"source_link":null,"def":{"name":"name=","args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"String | ::Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@name = _name"}},{"id":"to_s(io:IO)-instance-method","html_id":"to_s(io:IO)-instance-method","name":"to_s","doc":null,"summary":null,"abstract":false,"args":[{"name":"io","doc":null,"default_value":"","external_name":"io","restriction":"IO"}],"args_string":"(io : IO)","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubUser.cr#L13","source_link":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubUser.cr#L13","def":{"name":"to_s","args":[{"name":"io","doc":null,"default_value":"","external_name":"io","restriction":"IO"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if name.nil?\n  @username\nelse\n  @name\nend"}},{"id":"to_yaml(__temp_39:YAML::Nodes::Builder)-instance-method","html_id":"to_yaml(__temp_39:YAML::Nodes::Builder)-instance-method","name":"to_yaml","doc":null,"summary":null,"abstract":false,"args":[{"name":"__temp_39","doc":null,"default_value":"","external_name":"__temp_39","restriction":"::YAML::Nodes::Builder"}],"args_string":"(__temp_39 : YAML::Nodes::Builder)","source_link":null,"source_link":null,"def":{"name":"to_yaml","args":[{"name":"__temp_39","doc":null,"default_value":"","external_name":"__temp_39","restriction":"::YAML::Nodes::Builder"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"__temp_39.mapping(reference: self) do\n  _name = @name\n  if _name.nil?\n  else\n    \"name\".to_yaml(__temp_39)\n    _name.to_yaml(__temp_39)\n  end\n  _username = @username\n  if _username.nil?\n  else\n    \"username\".to_yaml(__temp_39)\n    _username.to_yaml(__temp_39)\n  end\nend"}},{"id":"username:String-instance-method","html_id":"username:String-instance-method","name":"username","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"username","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@username"}},{"id":"username=(_username:String)-instance-method","html_id":"username=(_username:String)-instance-method","name":"username=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_username","doc":null,"default_value":"","external_name":"_username","restriction":"String"}],"args_string":"(_username : String)","source_link":null,"source_link":null,"def":{"name":"username=","args":[{"name":"_username","doc":null,"default_value":"","external_name":"_username","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@username = _username"}}],"macros":[],"types":[]},{"html_id":"github.com/jasonrobot/contributions/Payload","path":"Payload.html","kind":"class","full_name":"Payload","name":"Payload","abstract":false,"superclass":{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/jasonrobot/contributions/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"Contributions/GithubEvent.cr","line_number":21,"url":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubEvent.cr"}],"repository_name":"github.com/jasonrobot/contributions","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"The payload object that is passed back in the event object","summary":"<p>The payload object that is passed back in the event object</p>","class_methods":[],"constructors":[{"id":"new(__temp_59:JSON::PullParser)-class-method","html_id":"new(__temp_59:JSON::PullParser)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"__temp_59","doc":null,"default_value":"","external_name":"__temp_59","restriction":"::JSON::PullParser"}],"args_string":"(__temp_59 : JSON::PullParser)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"__temp_59","doc":null,"default_value":"","external_name":"__temp_59","restriction":"::JSON::PullParser"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(__temp_59)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"commits:Array(JSON::Any)?-instance-method","html_id":"commits:Array(JSON::Any)?-instance-method","name":"commits","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Array(JSON::Any)?","source_link":null,"source_link":null,"def":{"name":"commits","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(JSON::Any) | ::Nil","visibility":"Public","body":"@commits"}},{"id":"commits=(_commits:Array(JSON::Any)?)-instance-method","html_id":"commits=(_commits:Array(JSON::Any)?)-instance-method","name":"commits=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_commits","doc":null,"default_value":"","external_name":"_commits","restriction":"Array(JSON::Any) | ::Nil"}],"args_string":"(_commits : Array(JSON::Any)?)","source_link":null,"source_link":null,"def":{"name":"commits=","args":[{"name":"_commits","doc":null,"default_value":"","external_name":"_commits","restriction":"Array(JSON::Any) | ::Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@commits = _commits"}},{"id":"to_json(json:JSON::Builder)-instance-method","html_id":"to_json(json:JSON::Builder)-instance-method","name":"to_json","doc":null,"summary":null,"abstract":false,"args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"args_string":"(json : JSON::Builder)","source_link":null,"source_link":null,"def":{"name":"to_json","args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"json.object do\n  _commits = @commits\n  if _commits.nil?\n  else\n    json.field(\"commits\") do\n      _commits.to_json(json)\n    end\n  end\nend"}}],"macros":[],"types":[]},{"html_id":"github.com/jasonrobot/contributions/Repo","path":"Repo.html","kind":"class","full_name":"Repo","name":"Repo","abstract":false,"superclass":{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/jasonrobot/contributions/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/jasonrobot/contributions/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"Contributions/GithubEvent.cr","line_number":4,"url":"https://github.com/jasonrobot/contributions/blob/e84e13d78e1a1ad7267fd2d170d43caa7d04c3c0/src/Contributions/GithubEvent.cr"}],"repository_name":"github.com/jasonrobot/contributions","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"The repo object that is passed back in the event object","summary":"<p>The repo object that is passed back in the event object</p>","class_methods":[],"constructors":[{"id":"new(__temp_43:JSON::PullParser)-class-method","html_id":"new(__temp_43:JSON::PullParser)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"__temp_43","doc":null,"default_value":"","external_name":"__temp_43","restriction":"::JSON::PullParser"}],"args_string":"(__temp_43 : JSON::PullParser)","source_link":null,"source_link":null,"def":{"name":"new","args":[{"name":"__temp_43","doc":null,"default_value":"","external_name":"__temp_43","restriction":"::JSON::PullParser"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(__temp_43)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"id:Int32-instance-method","html_id":"id:Int32-instance-method","name":"id","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Int32","source_link":null,"source_link":null,"def":{"name":"id","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Int32","visibility":"Public","body":"@id"}},{"id":"id=(_id:Int32)-instance-method","html_id":"id=(_id:Int32)-instance-method","name":"id=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"Int32"}],"args_string":"(_id : Int32)","source_link":null,"source_link":null,"def":{"name":"id=","args":[{"name":"_id","doc":null,"default_value":"","external_name":"_id","restriction":"Int32"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@id = _id"}},{"id":"name:String-instance-method","html_id":"name:String-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@name"}},{"id":"name=(_name:String)-instance-method","html_id":"name=(_name:String)-instance-method","name":"name=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"String"}],"args_string":"(_name : String)","source_link":null,"source_link":null,"def":{"name":"name=","args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@name = _name"}},{"id":"to_json(json:JSON::Builder)-instance-method","html_id":"to_json(json:JSON::Builder)-instance-method","name":"to_json","doc":null,"summary":null,"abstract":false,"args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"args_string":"(json : JSON::Builder)","source_link":null,"source_link":null,"def":{"name":"to_json","args":[{"name":"json","doc":null,"default_value":"","external_name":"json","restriction":"::JSON::Builder"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"json.object do\n  _id = @id\n  if _id.nil?\n  else\n    json.field(\"id\") do\n      _id.to_json(json)\n    end\n  end\n  _name = @name\n  if _name.nil?\n  else\n    json.field(\"name\") do\n      _name.to_json(json)\n    end\n  end\n  _url = @url\n  if _url.nil?\n  else\n    json.field(\"url\") do\n      _url.to_json(json)\n    end\n  end\nend"}},{"id":"url:String-instance-method","html_id":"url:String-instance-method","name":"url","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":null,"source_link":null,"def":{"name":"url","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@url"}},{"id":"url=(_url:String)-instance-method","html_id":"url=(_url:String)-instance-method","name":"url=","doc":null,"summary":null,"abstract":false,"args":[{"name":"_url","doc":null,"default_value":"","external_name":"_url","restriction":"String"}],"args_string":"(_url : String)","source_link":null,"source_link":null,"def":{"name":"url=","args":[{"name":"_url","doc":null,"default_value":"","external_name":"_url","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@url = _url"}}],"macros":[],"types":[]}]}})