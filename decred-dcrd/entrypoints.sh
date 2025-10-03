#!/bin/bash
set -e

# Create dcrd.conf if it doesn't exist
if [ ! -f /root/.dcrd/dcrd.conf ]; then
    mkdir -p /root/.dcrd
    cat > /root/.dcrd/dcrd.conf <<EOF
# Network
listen=0.0.0.0:9108

# RPC Server
rpclisten=0.0.0.0:9109
rpcuser=${APP_DECRED_NODE_RPC_USER:-umbrel}
rpcpass=${APP_DECRED_NODE_RPC_PASS:-$(head -c 32 /dev/urandom | base64)}

# Logging
debuglevel=info

# Performance
maxpeers=125
EOF
fi

exec dcrd --configfile=/root/.dcrd/dcrd.conf
