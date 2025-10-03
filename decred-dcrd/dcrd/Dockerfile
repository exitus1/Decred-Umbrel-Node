FROM ubuntu:22.04

ENV DCRD_VERSION=2.0.6

# Install necessary tools:
# curl (robust downloader), ca-certificates (for HTTPS), coreutils (for sha256sum), gnupg
# Note: Ubuntu is often more resilient than Debian-slim images.
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    coreutils \
    gnupg \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

# CRITICAL FIX: Direct link to the binary. This should resolve the 0% stall.
RUN curl -L -o dcrd.tar.gz https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    echo "e957f867055e2d63321593c66f57e6275811c750f584e030018f3a3848b5ffb0 dcrd.tar.gz" | sha256sum -c - && \
    tar -xzf dcrd.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    rm -rf /tmp/*

RUN mkdir -p /data/.dcrd

# Copy the entrypoint script (which we confirmed uses chown and exec)
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9108 9109

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
