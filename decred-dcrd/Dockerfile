FROM debian:bullseye-slim

ENV DCRD_VERSION=2.0.6

RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

RUN wget https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    tar -xzf dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    rm -rf /tmp/*

RUN mkdir -p /data/.dcrd

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9108 9109

ENTRYPOINT ["/entrypoint.sh"]
