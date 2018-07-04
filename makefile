CC=crystal	

DEBUG_FLAGS := -debug

MAIN_FILE = src/contributions.cr
SRC_DIR := src
SRC_FILES := $(wildcard $(SRC_DIR)/*.cr)

USERS_YML := users.yml

TARGET := github-tracker

LOCAL_BIN := ~/bin/
CONFIG_DIR := ~/.config/github-tracker/

build: $(SRC_FILES)
	$(CC) build $(MAIN_FILE) -o $(TARGET)

test: $(SRC_FILES)
	$(CC) spec

install: build
	cp $(TARGET) $(LOCAL_BIN)
	mkdir -p $(CONFIG_DIR)
	cp $(USERS_YML) $(CONFIG_DIR)

run: $(SRC_FILES)
	$(CC) run $(MAIN_FILE)
