# Simple reliable Dockerfile using pre-built binaries
FROM debian:bullseye-slim

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download and install dcrd binaries
WORKDIR /tmp
ENV DCRD_VERSION=2.0.6
RUN wget https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    tar -xzf dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrdctl /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    chmod +x /usr/local/bin/dcrdctl && \
    rm -rf /tmp/*

# Create data directory and user
RUN mkdir -p /home/decred && \
    useradd -u 1000 -d /home/decred -s /bin/bash decred && \
    chown -R decred:decred /home/decred

USER decred
WORKDIR /home/decred

EXPOSE 9108 9109

ENTRYPOINT ["dcrd"]
