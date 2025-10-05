FROM debian:bullseye-slim

ENV DCRD_VERSION=2.0.6
ENV DCRD_URL=https://github.com/decred/decred-binaries/releases/download/v${DCRD_VERSION}/dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz
ENV DCRD_FILENAME=dcrd-linux-amd64-v${DCRD_VERSION}.tar.gz
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    wget && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

RUN wget ${DCRD_URL} && \
    tar -xzf ${DCRD_FILENAME} && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrd /usr/local/bin/ && \
    mv dcrd-linux-amd64-v${DCRD_VERSION}/dcrdctl /usr/local/bin/ && \
    chmod +x /usr/local/bin/dcrd && \
    chmod +x /usr/local/bin/dcrdctl && \
    rm -rf /tmp/*

VOLUME ["/root/.dcrd"]

EXPOSE 9108 9109

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
