FROM debian:bullseye-slim

ENV DCRD_VERSION=2.0.6
ENV DCRD_URL=https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    wget && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

RUN wget ${DCRD_URL} && \
    tar -xzf dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    rm -rf /tmp/*
