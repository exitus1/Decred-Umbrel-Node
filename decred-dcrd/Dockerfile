# Use official Decred Docker approach - simplified for Umbrel
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git ca-certificates

# Create unprivileged user
ENV USER=decred
ENV UID=10000
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home="/home/${USER}" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

# Build dcrd
WORKDIR /go/src/github.com/decred/dcrd
ARG DCRD_BUILD_TAG=release-v2.0.6
RUN git clone --branch ${DCRD_BUILD_TAG} -c advice.detachedHead=false https://github.com/decred/dcrd . && \
    CGO_ENABLED=0 GOOS=linux \
    go install -trimpath -tags safe,netgo,timetzdata \
      -ldflags="-s -w" \
      . ./cmd/gencerts ./cmd/promptsecret

# Build dcrctl
WORKDIR /go/src/github.com/decred/dcrctl
RUN git clone --branch ${DCRD_BUILD_TAG} -c advice.detachedHead=false https://github.com/decred/dcrctl . && \
    CGO_ENABLED=0 GOOS=linux \
    go install -trimpath -tags safe,netgo -ldflags="-s -w"

# Production image
FROM alpine:latest
RUN apk add --no-cache ca-certificates

ENV DECRED_DATA=/home/decred
ENV DCRD_NO_FILE_LOGGING=true

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
COPY --from=builder /go/bin/* /bin/

# Create data directory
RUN mkdir -p /home/decred && chown decred:decred /home/decred

USER decred

EXPOSE 9108 9109

ENTRYPOINT [ "dcrd" ]
