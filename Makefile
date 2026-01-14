.PHONY: back front all back-clean front-clean fclean

all:
	cd back-end && docker compose up --build -d
	cd front-end && docker compose up --build -d

stop: back-stop front-stop

# Launch back-end
back:
	cd back-end && docker compose up --build

# Launch front-end
front:
	cd front-end && docker compose up --build

# Clean back-end (remove containers)
back-stop:
	cd back-end && docker compose down

# Clean front-end (remove containers)
front-stop:
	cd front-end && docker compose down

# Full clean (remove images, containers, and volumes)
fclean:
	cd back-end && docker compose down -v --rmi all
	cd front-end && docker compose down -v --rmi all
