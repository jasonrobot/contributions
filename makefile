CC=crystal	

MAIN_FILE = src/contributions.cr
SRC_DIR := src
SRC_FILES := $(wildcard $(SRC_DIR)/*.cr)

DEBUG_FLAGS := -debug

build: $(SRC_FILES)
	$(CC) build $(MAIN_FILE)

run: $(SRC_FILES)
	$(CC) run $(MAIN_FILE)
