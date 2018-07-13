CC=crystal	

DEBUG_FLAGS := -debug

MAIN_FILE = src/contributions.cr
SRC_DIR := src/Contributions
SRC_FILES := $(wildcard src/Contributions/*.cr)

USERS_YML := users.yml

TARGET := github-tracker

LOCAL_BIN := ~/bin/
CONFIG_DIR := ~/.config/github-tracker/

$(TARGET): $(MAIN_FILE) $(SRC_FILES)
	$(CC) build $(MAIN_FILE) -o $(TARGET)

# learning is hard!
help: $(MAIN_FILE) $(SRC_FILES)
	@echo $@
	@echo $^
	@echo $(SRC_DIR)
	@echo $(wildcard $(SRC_DIR)/*.cr)
	@echo $(SRC_FILES)

test: $(SRC_FILES)
	$(CC) spec

install: $(TARGET)
	cp $(TARGET) $(LOCAL_BIN)
	mkdir -p $(CONFIG_DIR)
	cp $(USERS_YML) $(CONFIG_DIR)

run: $(TARGET)
	$(CC) run $(MAIN_FILE)

docs: $(MAIN_FILE) $(SRC_FILES)
	$(CC) docs
