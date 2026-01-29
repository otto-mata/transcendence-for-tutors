
all: backend-up frontend-up

frontend-up:
	@echo Running 'frontend-up'...
	docker compose -f front-end/docker-compose.yml up --build -d

frontend-down:
	@echo Running 'frontend-down'...
	docker compose -f front-end/docker-compose.yml down

backend-up:
	@echo Running 'backend-up'...
	docker compose -f back-end/docker-compose.yml up --build -d


backend-down:
	@echo Running 'backend-down'...
	docker compose -f back-end/docker-compose.yml down

clean: backend-down frontend-down
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
