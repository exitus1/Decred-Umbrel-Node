#!/bin/bash

export APP_DECRED_NODE_RPC_PORT="9109"
export APP_DECRED_NODE_P2P_PORT="9108"
export APP_DECRED_NODE_RPC_USER="umbrel"
export APP_DECRED_NODE_RPC_PASS=$(head -c 32 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 32)


