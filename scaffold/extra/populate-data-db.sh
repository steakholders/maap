#!/bin/bash

if [ -z "$*" ]; then
	echo "Usage:"
	echo "  $0 [mongoimport options]"
	echo ""
	echo "Examples:"
	echo "  $0 --host localhost:27017 --db data"
	echo "  $0 --host localhost --port 27017 --db data"
	echo "  $0 --host localhost --port 27017 --username steak --password holders --db data"
	echo ""
	echo "This script imports example data **used as analysis data** into the selected database."
	echo "It upserts (=updates or inserts) objects in the database."
	exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
options="$*"

# DATA DB
echo "[*] Populate with customers.json..."
command="mongoimport $options --upsert --collection customers < '$DIR/customers.json'"
echo $command
eval $command

echo "[*] Populate with products.json..."
command="mongoimport $options --upsert --collection products < '$DIR/products.json'"
echo $command
eval $command

echo "[*] Populate with orders.json..."
command="mongoimport $options --upsert --collection orders < '$DIR/orders.json'"
echo $command
eval $command

echo "[*] Done."