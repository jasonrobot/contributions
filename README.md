# Commit Tracker

A simple project for tracking commits per day based on a list of users

Modify `users.yml` with a list of users you want to track.

Tracks number of PushEvents with commits for the current day.
This is similar to the contributions graph GitHub provides, but there may be some differences in how they are counted. 

This is a rewrite in the Crystal language. This way it will get more upvotes on Reddit and HackerNews. Mostly though, I was just wanting to play with Crystal again and didnt put in the effort to make my own project.

[Documentation is hosted here!](https://jasonrobot.github.io/contributions/)

## Building

You can use the makefile, or use crystal's own tools. The makefile just runs "crystal ..."

### Build
```
make 
#or
crystal build src/contributions.cr
```

### Run
```
make run
# or
crystal build src/contributions.cr
```

### Install
By default, installs to ~/bin, and the config file to /.config/github-tracker/users.yml
```
make install
```
