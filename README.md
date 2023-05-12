# Запуск
docker compose build
docker compose up -d --force-recreate

# Миграции
npm run migration:generate -- src/migrations/event_view

docker login nexus.caaat.pro
docker build . -t nexus.caaat.pro/repository/docker-projects/fresco-company-api:latest
docker push nexus.caaat.pro/repository/docker-projects/fresco-company-api:latest

enrollToEvent