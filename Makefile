all: ssl-check
	@echo "Démarrage de tft ..."
	docker compose up --build -d
	@echo ""
	@echo "Démarré!"
	@echo "   → Frontend: https://localhost:8443"
	@echo "   → API:      https://localhost:8443/api"
	@echo "   → WebSocket: wss://localhost:8443/ws"

ssl-check:
	@if [ ! -f back-end/nginx/ssl/private-key.pem ] || [ ! -f back-end/nginx/ssl/public-certificate.pem ]; then \
		echo "Génération des certificats SSL..."; \
		chmod +x generate-ssl.sh && ./generate-ssl.sh; \
	else \
		echo "✅ Certificats SSL trouvés"; \
	fi

ssl-generate:
	@chmod +x generate-ssl.sh && ./generate-ssl.sh

down:
	@echo "🛑 Arrêt de l'application..."
	docker compose down

up:
	docker compose up -d

clean:
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
