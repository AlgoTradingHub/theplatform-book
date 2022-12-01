#!/bin/bash
set -e

# Script for starting platform serving documentation at http://localhost:8080
#

# FAQ.
# ==============================================================================
# Q: Which platform is used for server?
# A: If "theplatform-book" is bundled together with platform distribution,
#    then this distribution is used.
#    Otherwise env variable OHOME must point to any existing platform root dir
# ==============================================================================
# Q: How to kill server process?
# A: Enter \\ (double back slashes) at REPL to kill server process
# ==============================================================================
# Q/A: If tachyon cannot open port - do following:
# $ sudo apt-get install libcap2-bin
# $ sudo setcap 'cap_net_bind_service=+ep' $TACHYON
# ==============================================================================


# use local tachyon if the book is part of platform distribution
# PS.
# Cannot use "test -x ../../tachyon" due to desire to handle symlinks "naturally".
# If current directory is symlink then "test -x ../../tachyon" will search for tachyon binary in resolved symlink directory plus 2 levels up instead
pushd ../.. &> /dev/null
if test -x tachyon && test -e std/repl.o; then
   echo "Detected bundled book"
   export OHOME=$(readlink -e .)
fi
popd &> /dev/null

echo "OHOME: $OHOME"
test -d "$OHOME" || eval 'echo "OHOME env var expected to contain platform root directory"; exit 1'

export PATH=$PATH:$OHOME
export BIND="0.0.0.0:8080"

TACHYON=$(which tachyon)
echo "Tachyon bin: $TACHYON"

OLOG=debug rlwrap $TACHYON -c 0 -f server.o
