PROJECT= "Scaffold: "
REPORTS= reports
ROOT= $(shell pwd)

MAKE= make --no-print-directory
NPM= npm
BOWER= ./node_modules/.bin/bower

JSHINT= ./node_modules/.bin/jshint
JSHINT_CLIENT_OPTS= --config .jshintrc-client
JSHINT_SERVER_OPTS= --config .jshintrc-server

CR= ./node_modules/.bin/cr
CR_OPTS= 

PLATO= ./node_modules/.bin/plato
PLATO_OPTS= --title Scaffold

KARMA= ./node_modules/karma/bin/karma

JS_CLIENT_FILES= $(shell find app/scripts -name '*.js')
JS_SERVER_FILES= $(shell find . -maxdepth 1 -name '*.js') $(shell find test -name '*.js')
TEST_FILES= $(shell find test -name '*.js')


default: test

prepare:
	@# Fix per bower install su OpenShift
	HOME="/tmp" && $(NPM) install
	test -d $(REPORTS) || mkdir $(REPORTS)

clean:
	rm -rf $(REPORTS)
	rm -rf app/bower_components
	rm -rf node_modules


test:
	@$(MAKE) jshint-client
	@$(MAKE) jshint-server
	@$(MAKE) karma

test-report:
	@$(MAKE) jshint-client-report
	@$(MAKE) jshint-server-report
	@$(MAKE) plato-report
	@$(MAKE) complexity-report
	@$(MAKE) karma-report


# Static analysis
jshint: jshint-server jshint-client

jshint-client:
	@echo "$(PROJECT)Executing JSHint Client..."
	@$(JSHINT) $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES)

jshint-server:
	@echo "$(PROJECT)Executing JSHint Server..."
	@$(JSHINT) $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES)

jshint-client-report:
	@echo "$(PROJECT)Executing JSHint Client Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_CLIENT_OPTS) $(JS_CLIENT_FILES) > $(REPORTS)/checkstyle-client-result.xml

jshint-server-report:
	@echo "$(PROJECT)Executing JSHint Server Report..."
	-@$(JSHINT) --reporter checkstyle $(JSHINT_SERVER_OPTS) $(JS_SERVER_FILES) > $(REPORTS)/checkstyle-server-result.xml

plato-report:
	@echo "$(PROJECT)Executing Plato..."
	-@$(PLATO) $(PLATO_OPTS) -d $(REPORTS)/metrics $(JS_CLIENT_FILES) $(JS_SERVER_FILES)

complexity-report:
	@echo "$(PROJECT)Executing Complexity Report..."
	-@$(CR) $(CR_OPTS) --format json --output $(REPORTS)/complexity-report.json --filepattern ".*\.js" app/scripts/
	-@$(CR) $(CR_OPTS) --format plain --output $(REPORTS)/complexity-report.txt --filepattern ".*\.js" app/scripts/

# Unit test
karma:
	@echo "$(PROJECT)Executing Karma..."
	@$(KARMA) start

karma-report:
	@echo "$(PROJECT)Executing Karma..."
	-@$(KARMA) start

.PHONY: default prepare clean test test-report \
	jshint jshint-client jshint-server jshint-client-report jshint-server-report \
	plato-report complexity-report karma karma-report
