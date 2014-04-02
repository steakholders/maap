#!/bin/bash

if [ -z "$*" ]; then
	echo "Usage:"
	echo "  $0 [mongoimport options]"
	echo ""
	echo "Examples:"
	echo "  $0 --host localhost:27017 --db users"
	echo "  $0 --host localhost --port 27017 --db users"
	echo "  $0 --host localhost --port 27017 --username steak --password holders --db users"
	echo ""
	echo "This script imports example data **used by the authentication service** into the selected database."
	echo "It upserts (=updates or inserts) objects in the database."
	exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
options="$*"

# USERS DB
echo "[*] Populate with users.json..."
command="mongoimport $options --upsert --collection users < '$DIR/users.json'"
echo $command
eval $command

echo "[*] Done."