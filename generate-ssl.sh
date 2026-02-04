#!/bin/bash

SSL_DIR="./nginx/ssl/"

mkdir -p "$SSL_DIR"

if [ -f "$SSL_DIR/private-key.pem" ] && [ -f "$SSL_DIR/public-certificate.pem" ]; then
  echo "✅ Certificats SSL existants trouvés dans $SSL_DIR"
  read -p "Voulez-vous les régénérer ? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Conservation des certificats existants."
    exit 0
  fi
fi

echo "🔐 Génération des certificats SSL auto-signés..."

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$SSL_DIR/private-key.pem" \
  -out "$SSL_DIR/public-certificate.pem" \
  -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=Transcendence/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
