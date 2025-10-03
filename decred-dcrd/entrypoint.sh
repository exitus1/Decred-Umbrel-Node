#!/bin/bash
set -e

DATA_DIR="/data/.dcrd"
CONF_FILE="${DATA_DIR}/dcrd.conf"

echo "Starting dcrd setup..."

# 1. Input Validation: Check for required RPC credentials from Umbrel environment variables
if [ -z "${APP_DECRED_NODE_RPC_USER}" ] || [ -z "${APP_DECRED_NODE_RPC_PASS}" ]; then
    echo "ERROR: Required Umbrel environment variables (APP_DECRED_NODE_RPC_USER/PASS) are missing!"
    exit 1
fi

# 2. Create data directory if it doesn't exist
mkdir -p "${DATA_DIR}"

# 3. Configuration File Check: Only generate the config if it does not already exist.
if [ ! -f "${CONF_FILE}" ]; then
    echo "Generating initial dcrd.conf..."
    cat > "${CONF_FILE}" << EOF
# dcrd configuration for Umbrel App Store
[Application Options]
datadir=${DATA_DIR}
logdir=${DATA_DIR}/logs

# Umbrel-provided RPC credentials and dynamic ports
rpcuser=${APP_DECRED_NODE_RPC_USER}
rpcpass=${APP_DECRED_NODE_RPC_PASS}
rpclisten=0.0.0.0:${APP_DECRED_NODE_RPC_PORT}
notls=1

# P2P listening port
listen=0.0.0.0:${APP_DECRED_NODE_P2P_PORT}

# Critical indexes required for wallet and dashboard functionality
txindex=1
addrindex=1

# Performance and logging
maxpeers=125
debuglevel=info

# Important: This sets the node to use the main Decred network.
network=mainnet
EOF
fi

echo "Starting Decred node..."
# The --configfile flag points dcrd to the configuration we just created or found.
exec /usr/local/bin/dcrd --configfile="${CONF_FILE}"
