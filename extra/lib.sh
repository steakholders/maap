#!/bin/bash

if [ ! -f "$REPO_DIR/extra/lib.sh" ]; then
	echo "/!\ La variabile $REPO_DIR non è corretta"
fi

# Importante: permette di eseguire i cicli "for file in [pattern]" nel caso
# particolare in cui il pattern non è rispettato da nessun file.
# Di default la stringa del pattern viene utilizzata come nome del file.
# [http://wiki.bash-hackers.org/syntax/expansion/globs]
shopt -s nullglob

function is_mac_os() {
	[ "$(uname)" == "Darwin" ]
	return $?;
}

function absolute_path() {
	if is_mac_os; then
		greadlink -mn "$1"
	else
		readlink -mn "$1"
	fi
}

function pretty_path() {
	absolute_file=$(absolute_path "$1")
	absolute_dir=$(absolute_path "$REPO_DIR")
	
	# Calcola il percorso relativo rispetto a $REPO_DIR
	python_out=$(python -c "import os.path; print os.path.relpath('$absolute_file','$absolute_dir')")
	
	# Se python fallisce stampa il percorso assoluto
	if [ $? == 0 ]; then
		echo "$python_out"
	else
		echo "$absolute_file"
	fi
}

function log(){
	level="$1"
	message="${@:2}"

	# Se i colori sono supportati
	if tput colors > /dev/null
	then
		if is_mac_os; then
			# Colori mac
			GREEN="\033[0;32m"
			RED="\033[0;31m"
			ORANGE="\033[0;33m"
			CLEAR="\033[0m"
		else
			# Colori linux
			GREEN="\e[32m"
			RED="\e[31m"
			ORANGE="\e[33m"
			CLEAR="\e[0m"
		fi
	fi
	
	case $level in
		error)
			echo -ne "${RED}" 1>&2
			echo -n "/!\\ $message" 1>&2
			echo -e "${CLEAR}" 1>&2
			;;
		warning)
			echo -ne "${ORANGE}" 1>&2
			echo -n "[W] $message" 1>&2
			echo -e "${CLEAR}" 1>&2
			;;
		success)
			echo -ne "${GREEN}" 1>&2
			echo -n "[ ] $message" 1>&2
			echo -e "${CLEAR}" 1>&2
			;;
		info)
			echo "[*] $message"
			;;
		add)
			echo "[+] $message"
			;;
		*)
			echo "[ ] $message"
	esac
}

function set_red_text() {
	# Non andare a capo
	if is_mac_os; then
		echo -ne "\033[31m"
	else
		echo -ne "\e[31m"
	fi
}

function reset_text_color() {
	# Non andare a capo
	if is_mac_os; then
		echo -ne "\033[0m"
	else
		echo -ne "\e[0m"
	fi
}

