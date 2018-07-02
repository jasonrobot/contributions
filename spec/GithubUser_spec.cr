require "./spec_helper"

describe "GithubUser" do
  
  it "should run" do
    false.should_not eq(true)
  end
  
  describe "#from_yaml" do
    it "should deserialize from yaml" do
      result = GithubUser.from_yaml("name: tester\nusername: xXxh420xerxXx")
      result.name.should eq "tester"
      result.username.should eq "xXxh420xerxXx"
    end
  end
end
