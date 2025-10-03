#!/bin/bash
set -e

DATA_DIR="/data/.dcrd"
CONF_FILE="${DATA_DIR}/dcrd.conf"

mkdir -p "${DATA_DIR}"

if [ ! -f "${CONF_FILE}" ]; then
    cat > "${CONF_FILE}" << EOF
[Application Options]
datadir=${DATA_DIR}
logdir=${DATA_DIR}/logs

rpcuser=${APP_DECRED_NODE_RPC_USER}
rpcpass=${APP_DECRED_NODE_RPC_PASS}
rpclisten=0.0.0.0:${APP_DECRED_NODE_RPC_PORT}
notls=1

listen=0.0.0.0:${APP_DECRED_NODE_P2P_PORT}

maxpeers=125
EOF
fi

echo "Starting Decred node..."
exec /usr/local/bin/dcrd --configfile="${CONF_FILE}"
