require "./spec_helper"

describe "GithubUser" do
  describe "#from_yaml" do
    it "should deserialize from yaml" do
      result = GithubUser.from_yaml "name: tester\nusername: xXxh420xerxXx"
      result.name.should eq "tester"
      result.username.should eq "xXxh420xerxXx"
    end

    it "should allow name to be nil" do
      result = GithubUser.from_yaml "username: tester"
      result.name.should eq nil
      result.username.should eq "tester"
    end
  end

  describe "#to_s" do
    it "should return the name" do
      result = GithubUser.from_yaml "name: tester\nusername: user"
      "#{result}".should eq "tester"
    end
    
    it "should return the username if name is nil" do
      result = GithubUser.from_yaml "username: tester"
      str = "#{result.to_s}"
      str.should eq "tester"
    end
  end

  # it "string format calls to_s right?" do
  #   result = GithubUser.from_yaml "username: tester"
  #   "#{result}".should eq "tester"
  # end
end
