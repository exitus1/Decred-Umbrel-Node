#!/bin/bash

# Ensure the data directory is owned by the user ID 1000 (standard Umbrel user)
# This prevents permissions errors when dcrd tries to write to /data/.dcrd
chown -R 1000:1000 /data

# Use 'exec' to replace the shell process with the dcrd process, which is best practice
# and ensures signals (like stop) are passed correctly.

exec /usr/local/bin/dcrd \
    --rpcuser=$APP_DECRED_NODE_RPC_USER \
    --rpcpass=$APP_DECRED_NODE_RPC_PASS \
    --rpclisten=0.0.0.0:$APP_DECRED_NODE_RPC_PORT \
    --listen=0.0.0.0:$APP_DECRED_NODE_P2P_PORT \
    --datadir=/data/.dcrd \
    "$@"
