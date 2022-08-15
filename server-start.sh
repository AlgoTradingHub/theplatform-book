#!/bin/bash

# If tachyon cannot open port - do following:
# sudo apt-get install libcap2-bin
# sudo setcap 'cap_net_bind_service=+ep' $TACHYON

set -e

export PATH=$PATH:$OHOME
export BIND="0.0.0.0:8080"

TACHYON=$(which tachyon)

OLOG=debug rlwrap $TACHYON -c 0 -f server.o
