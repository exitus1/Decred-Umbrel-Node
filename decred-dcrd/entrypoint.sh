#!/bin/bash
set -e

# Create dcrd.conf if it doesn't exist
if [ ! -f /root/.dcrd/dcrd.conf ]; then
    mkdir -p /root/.dcrd
    cat <<EOF > /root/.dcrd/dcrd.conf
# Network
listen=0.0.0.0:${APP_DECRED_NODE_P2P_PORT:-9108}

# RPC Server
rpclisten=0.0.0.0:${APP_DECRED_NODE_RPC_PORT:-9109}
rpcuser=${APP_DECRED_NODE_RPC_USER}
rpcpass=${APP_DECRED_NODE_RPC_PASS:-$(head -c 32 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 32)}
 
# Logging
debuglevel=info

# Performance
maxpeers=125
EOF
fi

exec dcrd --configfile=/root/.dcrd/dcrd.conf
