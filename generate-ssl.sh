#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# Script de génération de certificats SSL auto-signés pour le reverse proxy
# ═══════════════════════════════════════════════════════════════════════════════

SSL_DIR="./nginx/ssl"

# Crée le dossier ssl s'il n'existe pas
mkdir -p "$SSL_DIR"

# Vérifie si les certificats existent déjà
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

# Génère une clé privée et un certificat auto-signé
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$SSL_DIR/private-key.pem" \
    -out "$SSL_DIR/public-certificate.pem" \
    -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=Transcendence/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

if [ $? -eq 0 ]; then
    echo "✅ Certificats générés avec succès dans $SSL_DIR/"
    echo "   - private-key.pem (clé privée)"
    echo "   - public-certificate.pem (certificat public)"
    echo ""
    echo "⚠️  Note: Ces certificats sont auto-signés."
    echo "   Votre navigateur affichera un avertissement de sécurité."
    echo "   C'est normal en développement local."
else
    echo "❌ Erreur lors de la génération des certificats"
    exit 1
fi
