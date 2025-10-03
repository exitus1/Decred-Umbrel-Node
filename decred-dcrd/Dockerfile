FROM debian:bullseye-slim

ENV DCRD_VERSION=2.0.6

# Install necessary tools:
# wget: for downloading the binary
# ca-certificates: for secure downloads
# coreutils: CRITICAL FIX. Provides 'sha256sum', which was missing and causing the build to fail.
# gnupg: Best practice for verifying signatures
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    coreutils \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

# Download, verify, and install the dcrd binary
# The sha256sum check requires 'coreutils' to be installed.
RUN wget https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    echo "e957f867055e2d63321593c66f57e6275811c750f584e030018f3a3848b5ffb0 dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz" | sha256sum -c - && \
    tar -xzf dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    rm -rf /tmp/*

RUN mkdir -p /data/.dcrd

# Use the modified entrypoint.sh from the root directory
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9108 9109

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
