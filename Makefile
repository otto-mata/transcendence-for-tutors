
# ═══════════════════════════════════════════════════════════════════════════════
# Makefile avec Reverse Proxy Nginx
# ═══════════════════════════════════════════════════════════════════════════════

# Mode unifié avec reverse proxy (recommandé)
all: ssl-check
	@echo "🚀 Démarrage de l'application avec reverse proxy..."
	docker compose up --build -d
	@echo ""
	@echo "✅ Application démarrée!"
	@echo "   → Frontend: https://localhost:8443"
	@echo "   → API:      https://localhost:8443/api"
	@echo "   → WebSocket: wss://localhost:8443/ws"

# Génère les certificats SSL s'ils n'existent pas
ssl-check:
	@if [ ! -f nginx/ssl/private-key.pem ] || [ ! -f nginx/ssl/public-certificate.pem ]; then \
		echo "🔐 Génération des certificats SSL..."; \
		chmod +x generate-ssl.sh && ./generate-ssl.sh; \
	else \
		echo "✅ Certificats SSL trouvés"; \
	fi

ssl-generate:
	@chmod +x generate-ssl.sh && ./generate-ssl.sh

down:
	@echo "🛑 Arrêt de l'application..."
	docker compose down

logs:
	docker compose logs -f

logs-nginx:
	docker compose logs -f nginx

logs-api:
	docker compose logs -f core-api

logs-front:
	docker compose logs -f transcendence-front

logs-ws:
	docker compose logs -f socket-chat

# ═══════════════════════════════════════════════════════════════════════════════
# Mode legacy (services séparés) - conservé pour compatibilité
# ═══════════════════════════════════════════════════════════════════════════════

frontend-up:
	@echo Running 'frontend-up'...
	docker compose -f front-end/docker-compose.yml up --build -d

frontend-down:
	@echo Running 'frontend-down'...
	docker compose -f front-end/docker-compose.yml down

backend-up:
	@echo Running 'backend-up'...
	docker compose -f back-end/docker-compose.yml up --build -d

chat-up:
	@echo Running 'chat-up'...
	docker compose -f websocket/docker-compose.yml up --build -d

chat-down:
	@echo Running 'chat-down'...
	docker compose -f websocket/docker-compose.yml down



backend-down:
	@echo Running 'backend-down'...
	docker compose -f back-end/docker-compose.yml down

clean: backend-down frontend-down chat-down
	@echo Running 'clean'...
	if [ $(shell docker ps -q | wc -l) -ne 0 ]; then \
		docker stop $(shell docker ps -q); \
	fi
	if [ $(shell docker ps -aq | wc -l) -ne 0 ]; then \
		docker rm -f $(shell docker ps -aq); \
	fi

fclean: clean
	@echo Running 'fclean'...
	if [ $(shell docker ps -aq | wc -l) -ne 0 ]; then \
		docker stop $(shell docker ps -qa); \
	fi
	if [ $(shell docker images -qa | wc -l) -ne 0 ]; then \
		docker rmi $(shell docker images -qa); \
	fi
	if [ $(shell docker volume ls -q | wc -l) -ne 0 ]; then \
		docker volume rm $(shell docker volume ls -q); \
	fi
	if [ $(docker network inspect back-end_postgres-network) ]; then \
		docker network rm back-end_postgres-network; \
	fi

wipe-all: fclean
	@echo Running 'wipe-all'...
	docker system prune

re: fclean all

reset-re: wipe-all all
