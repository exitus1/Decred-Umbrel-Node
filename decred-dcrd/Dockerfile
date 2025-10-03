FROM debian:bullseye-slim

ENV DCRD_VERSION=2.0.6

RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

# Download, extract, and move the dcrd binary
RUN wget https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    tar -xzf dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    rm -rf /tmp/*

# Create the persistent data directory for Umbrel
RUN mkdir -p /data/.dcrd

# Copy the entrypoint script from the build context (assumed to be in the repository root)
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Standard Decred RPC and P2P ports
EXPOSE 9108 9109

# Execute the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
